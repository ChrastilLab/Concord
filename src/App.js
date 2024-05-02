import "./App.css";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

const loadScript = (src, onLoad) => {
  const script = document.createElement('script');
  script.src = src;
  script.async = true;
  script.defer = true;
  script.onload = onLoad || (() => {});
  document.body.appendChild(script);
};




const appClientId = '18444685338-jisp0gmkpo09v0kdpvbc4bvml0sanks6.apps.googleusercontent.com'; 
const apiKey = 'AIzaSyCGaJtazZxj7xwDJoa5uRh8QBit-2pfXRg';
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';



function App() {
 
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  const loadScript = (src, onLoad) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.defer = true;
    script.onload = onLoad || (() => {});
    document.body.appendChild(script);
  };

  const initClient = () => {
    window.gapi.client.init({
      apiKey: apiKey, 
      clientId: appClientId,
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
      scope: 'https://www.googleapis.com/auth/calendar.readonly',
    })
    // .then(() => {
    //   console.log("Google API Client initialized.");
    //   window.gapi.auth2.getAuthInstance().isSignedIn.listen(setIsSignedIn);
    //   setIsSignedIn(window.gapi.auth2.getAuthInstance().isSignedIn.get());
    //   if (isSignedIn) {
    //     listUpcomingEvents();
    //   }
    // }).catch(error => {
    //   console.error("Error initializing Google API Client: ", error);
    //   setError(error);
    // });
  };

  useEffect(() => {
    loadScript("https://apis.google.com/js/api.js", () => {
      console.log("GAPI loaded");
      window.gapi.load("client:auth2", initClient);
    });
  }, []);

  const listUpcomingEvents = async () => {
    try {
      const response = await window.gapi.client.calendar.events.list({
        calendarId: "primary",
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: "startTime",
      });
      console.log(response);  
      setEvents(response.result.items);
      if (response.result.items.length === 0) {
        setError("No upcoming events found.");
      }
    } catch (err) {
      console.error("Error fetching events: ", err);
      setError(err.message);
    }
  };

  const handleLoginSuccess = (response) => {
    console.log("Login successful:", response);
    jwtDecode(response.credential); // Optional: decode JWT token if needed
    initClient();
  };

  const handleLoginFailure = (response) => {
    console.error("Login failed:", response);
    setError("Failed to authenticate.");
  };


  return (
    <div className="App">
      <header className="App-header"></header>
      {isSignedIn ? (
          <button onClick={() => window.gapi.auth2.getAuthInstance().signOut()}>Sign Out</button>
        ) : (
          <GoogleLogin
            clientId={appClientId} // Your actual client ID
            scope="https://www.googleapis.com/auth/calendar"
            onSuccess={handleLoginSuccess}
            onFailure={handleLoginFailure}
          />
        )}
        {error && <p>{error}</p>}
    </div>
  );
}

export default App;
