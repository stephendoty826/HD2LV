import requests
from flask import Flask, redirect

app = Flask(__name__)

@app.route("/")
def hello():
  return "HELLO"

@app.route("/dbAuth")
def db_auth():
  redirect("https://www.dropbox.com/oauth2/authorize?client_id=6tp50cpnwmi7y1g&redirect_uri=http://127.0.0.1:5000/test_redirect&token_access_type=offline&response_type=code")

@app.route("/test_redirect")
def test_redirect():
  

if __name__=="__main__":
  app.run(debug=True)
