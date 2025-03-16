import requests
import json
import dropbox
from flask import Flask, redirect

app = Flask(__name__)

tokens = {}

def get_user_tokens(user_email):
  result = requests.get(f"http://localhost:5050/get-token/{user_email}")
  
  tokens[user_email] = json.loads(result.text)

  print(tokens[user_email])

  # todo testing dropbox connection

  dbx = dropbox.Dropbox(tokens[user_email]["accessToken"])

  print(dbx.users_get_current_account())

get_user_tokens("stephendoty826@yahoo.com")  

if __name__=="__main__":
  app.run(debug=True)
