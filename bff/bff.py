import requests
import json
import dropbox
from flask import Flask, redirect

app = Flask(__name__)

tokens = {}

#todo How can I make sure when someone linked to dropbox, the token will be put into the tokens object. 
@app.before_request
def get_user_tokens():
    global tokens
    try:
        result = requests.get("http://localhost:5050/get-tokens")
        result.raise_for_status()  # Raises an error for HTTP issues
        tokens = json.loads(result.text)
        print("Tokens loaded:", tokens)
    except requests.RequestException as e:
        print("Error fetching tokens:", e)
        tokens = {}

@app.route("/test/<account_id>")
def test(account_id):
  print(account_id)
  print(tokens)
  dbx = dropbox.Dropbox(tokens[account_id]["access_token"])
  print(dbx.users_get_current_account())
  return "did it work?"

if __name__=="__main__":
  app.run(debug=True)
