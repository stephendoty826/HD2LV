import requests
import json
import dropbox
from flask import Flask, redirect

app = Flask(__name__)

tokens = {}

def get_user_tokens():
  result = requests.get(f"http://localhost:5050/get-tokens")
  
  global tokens 
  tokens = json.loads(result.text)

get_user_tokens()  

@app.route("/test/<account_id>")
def test(account_id):
  print(account_id)
  dbx = dropbox.Dropbox(tokens[account_id]["access_token"])
  print(dbx.users_get_current_account())
  return "did it work?"

if __name__=="__main__":
  app.run(debug=True)
