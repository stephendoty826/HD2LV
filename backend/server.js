const express = require("express");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const crypto = require("crypto");
const dotenv = require("dotenv");
const axios = require("axios");
const qs = require("querystring");
const cors = require("cors");
const session = require("express-session");
const sqliteStoreFactory = require("express-session-sqlite").default;
//todo NEXT install express-session (express-session-sqlite) and work to implement it when the user links dropbox...store session_id in database table along with dropbox account_id. Use session_id to "see" who is logged in.

dotenv.config();

let REDIRECT_URI = process.env.REDIRECT_URI;
//todo store these securely (in Azure Cloud Vault?)
let CLIENT_ID = process.env.CLIENT_ID;
let CLIENT_SECRET = process.env.CLIENT_SECRET;
let SECRET_KEY = process.env.SECRET_KEY;
let SESSION_SECRET = process.env.SESSION_SECRET;

const SqliteStore = sqliteStoreFactory(session);
const app = express();
const PORT = process.env.PORT || 5050;

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 4,
    },
    store: new SqliteStore({
      driver: sqlite3.Database,
      path: "./sessions.db",
      ttl: 1000 * 60 * 60 * 4,
      prefix: "sess",
      cleanupInterval: 600000,
    }),
  })
);

// Middleware
app.use(express.json());
//todo fix this to be more secure
app.use(cors());

// Open SQLite database
const dbPromise = open({
  filename: "tokens.db",
  driver: sqlite3.Database,
});

// Initialize database
// todo - create another table for user_email and session-ID
// todo - Use cookie to store sessions-ID. Use session-ID to identify user entry
async function initDB() {
  const db = await dbPromise;
  await db.exec(`
    CREATE TABLE IF NOT EXISTS tokens (
      account_id TEXT PRIMARY KEY,
      auth_object TEXT,
      iv_hex TEXT
    )
  `);
}
initDB();

//! BUG: iv on encrypt is different than iv on decrypt
// Encrypt function for security
const encrypt = (authObject, secretKey) => {
  const iv = crypto.randomBytes(16); // Initialization vector for AES
  console.log("encrypt iv", iv);
  const key = crypto.createHash("sha256").update(secretKey).digest(); // Ensure 32-byte key
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  const authObjectString = JSON.stringify(authObject);
  let encryptedAuthObject = cipher.update(authObjectString, "utf8", "hex");
  encryptedAuthObject += cipher.final("hex");
  return { encrypted: encryptedAuthObject, iv: iv.toString("hex") };
};

const decrypt = (encryptedAuthObject, secretKey, ivHex) => {
  const iv = Buffer.from(ivHex, "hex");
  console.log("decrypt iv", iv);
  const key = crypto.createHash("sha256").update(secretKey).digest(); // Derive key the same way
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(encryptedAuthObject, "hex", "utf8");
  decrypted += decipher.final("utf8");
  console.log("decrypted", decrypted);
  console.log("JSON.parse(decrypted)", JSON.parse(decrypted));
  return JSON.parse(decrypted);
};

app.get("/session-test", (req, res) => {
  req.session.test = "this is a test."
  console.log(req.session)
  res.send("hello world")
})

app.get("/session-test2", (req, res) => {
  console.log(req.session.test)
  res.send("nothing important")
})

// Store Dropbox token
app.post("/save-token", async (req, res) => {
  let account_id;

  // get authCode and userEmail from body
  const { authCode } = req.body;

  try {
    const tokenResponse = await axios.post(
      "https://api.dropboxapi.com/oauth2/token",
      qs.stringify({
        code: authCode,
        grant_type: "authorization_code",
        redirect_uri: REDIRECT_URI,
      }),
      {
        auth: {
          username: CLIENT_ID,
          password: CLIENT_SECRET,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    authObject = tokenResponse.data;
    account_id = authObject.account_id;
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: error.response?.data || "Something went wrong" });
  }

  try {
    const db = await dbPromise;
    const encryptedObject = encrypt(authObject, SECRET_KEY);

    let result = await db.run(
      "INSERT INTO tokens (account_id, auth_object, iv_hex) VALUES (?, ?, ?) ON CONFLICT(account_id) DO UPDATE SET auth_object=excluded.auth_object",
      [account_id, encryptedObject.encrypted, encryptedObject.iv]
    );

    console.log("Database insertion result:", result);

    res.json({ success: true, message: "Token saved securely" });
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error.message });
  }
});

// Retrieve Dropbox token
app.get("/get-tokens/", async (req, res) => {
  console.log("128 test");
  try {
    const db = await dbPromise;
    const tokenDataArr = await db.all("SELECT * FROM tokens");

    if (!tokenDataArr) {
      return res.status(404).json({ error: "Token not found" });
    }

    let decryptedTokenObject = {};

    tokenDataArr.forEach((tokenData) => {
      print("iv", tokenData.iv_hex);
      decryptedTokenObject[tokenData.account_id] = decrypt(
        tokenData.auth_object,
        SECRET_KEY,
        tokenData.iv_hex
      );
    });

    console.log("decryptedTokenObject", decryptedTokenObject);

    res.json(decryptedTokenObject);
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
