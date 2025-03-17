const express = require("express");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const crypto = require('crypto');
const dotenv = require("dotenv");
const axios = require("axios")
const qs = require("querystring");
const cors = require("cors");

dotenv.config();

let REDIRECT_URI = "http://localhost:3000/db_authorization_code"
//todo store these securely (in Azure Cloud Vault)
let CLIENT_ID = "6tp50cpnwmi7y1g" 
let CLIENT_SECRET = "yqk6iratv3te4o2"
let SECRET_KEY = "9jhva729olh3k04"

const app = express();
const PORT = process.env.PORT || 5050;

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
      user_email TEXT PRIMARY KEY,
      auth_object TEXT,
      iv_hex TEXT
    )
  `);
}
initDB();

// Encrypt function for security
const encrypt = (authObject, secretKey) => {
  const iv = crypto.randomBytes(16); // Initialization vector for AES
  const key = crypto.createHash('sha256').update(secretKey).digest(); // Ensure 32-byte key
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  const authObjectString = JSON.stringify(authObject);
  let encryptedAuthObject = cipher.update(authObjectString, 'utf8', 'hex');
  encryptedAuthObject += cipher.final('hex');
  return { encrypted: encryptedAuthObject, iv: iv.toString('hex') };
};

const decrypt = (encryptedAuthObject, secretKey, ivHex) => {
  const iv = Buffer.from(ivHex, 'hex');
  const key = crypto.createHash("sha256").update(secretKey).digest(); // Derive key the same way
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(encryptedAuthObject, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return JSON.parse(decrypted);
};

// Store Dropbox token
app.post("/save-token", async (req, res) => {

  // get authCode and userEmail from body
  const { authCode, userEmail } = req.body

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

    authObject = tokenResponse.data

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.response?.data || "Something went wrong" });
  }

  try {
    const db = await dbPromise;
    const encryptedObject = encrypt(authObject, SECRET_KEY);

    console.log("Encrypted Auth Object:", encryptedObject);

    let result = await db.run(
      "INSERT INTO tokens (user_email, auth_object, iv_hex) VALUES (?, ?, ?) ON CONFLICT(user_email) DO UPDATE SET auth_object=excluded.auth_object",
      [userEmail, encryptedObject.encrypted, encryptedObject.iv]
    );

    console.log("Database insertion result:", result);

    res.json({ success: true, message: "Token saved securely" });
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error.message });
  }
});

// Retrieve Dropbox token 
app.get("/get-tokens/", async (req, res) => {

  try {
    const db = await dbPromise;
    const tokenDataArr = await db.all("SELECT * FROM tokens");

    if (!tokenDataArr) {
      return res.status(404).json({ error: "Token not found" });
    }

    let decryptedTokenObject = {}

    tokenDataArr.forEach(tokenData => {

      decryptedTokenObject[tokenData.user_email] = decrypt(tokenData.auth_object, SECRET_KEY, tokenData.iv_hex)
    })

    // let decryptedAuthArr = tokenDataArr.map(tokenData => { // todo forEach and make object with {"actual_user_email": "authObject_with_tokens"}

    //   let decryptedAuthObject = decrypt(tokenData.auth_object, SECRET_KEY, tokenData.iv_hex)

    //   return {tokenData.user_email: decryptedAuthObject}
    // })

    

    res.json(decryptedTokenObject);
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
