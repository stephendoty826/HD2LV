import React, {useEffect} from 'react'
import { useNavigate } from "react-router-dom";

const DropboxAuthorization = () => {

  const navigate = useNavigate();

  // todo get userEmail from dropbox
  useEffect(() => {
    async function codeToBackend() {
      let params = new URLSearchParams(document.location.search);
      let authCode = params.get("code");
      console.log(authCode) 
      let result = await fetch("http://localhost:5050/save-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ authCode, userEmail: "secondEmail@yahoo.com" })
      })
  
      let data = await result.json(); // Parse response as JSON
      console.log(data);
      navigate("/saved_loadouts");
  
    }
  
    codeToBackend()
  }, [])

  return (
    <div className="d-flex align-items-center flex-column">
      <h1 className="display-1">Dropbox Authorization</h1>
      <p className="display-6">The app is authorizing dropbox...please be patient.</p>
    </div>
  )
}

export default DropboxAuthorization