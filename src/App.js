import "./App.css";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
// import { getAuth, signInWithCredential, GoogleAuthProvider } from "firebase/auth";

function App() {

  
  return (
    <div className="App">
      <header className="App-header"></header>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const decodedCredentialResponse = jwtDecode(
            credentialResponse.credential
          );
          console.log(decodedCredentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
}

export default App;
