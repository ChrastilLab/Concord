import "./App.css";

import { useEffect, useState } from "react";
import {
  useSession,
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";

import DateTimePicker from "react-datetime-picker";

// const appClientId =
//   "18444685338-jisp0gmkpo09v0kdpvbc4bvml0sanks6.apps.googleusercontent.com";
// const DISCOVERY_DOC =
//   "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";
// const SCOPES = "https://www.googleapis.com/auth/calendar";

function App() {
  const session = useSession(); // tokens, when session exists, we have a user
  const supabase = useSupabaseClient(); // talk to supabase
  const { isLoading } = useSessionContext();

  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  if (isLoading) {
    return <></>;
  }

  async function googleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        scopes:
          "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/docs",
      },
    });

    if (error) {
      console.error(error);
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  async function createCalendarEvent() {
    console.log("Creating Calendar Event");

    const event = {
      summary: "Test Calendar Event",
      location: "1117 Sullivan, Irvine, CA 92614",
      description: "A test event for SNL web dev",
      start: {
        dateTime: "2024-05-17T09:00:00",
        timeZone: "America/Los_Angeles",
      },
      end: {
        dateTime: "2024-05-17T12:00:00",
        timeZone: "America/Los_Angeles",
      },
      attendees: [{'email' : 'rsima@uci.edu'}]
    };

    await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + session.provider_token, // Access token for google
        },
        body: JSON.stringify(event),
      }
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
      });
  }

  console.log(session);

  return (
    <div className="App">
      <header className="App-header"></header>
      <div style={{ width: "400px", margin: "30px auto" }}>
        {session ? (
          <>
            <h2>User Email: {session.user.email}</h2>
            {/* <p>Start of Event</p>
            <DateTimePicker onChange={setStart} value={start} />
            <p>End of Event</p>
            <DateTimePicker onChange={setEnd} value={end} /> */}

            <button onClick={() => createCalendarEvent()}>
              Create Calendar Event
            </button>
            <div />
            <button onClick={() => signOut()}>Sign Out</button>
          </>
        ) : (
          <>
            <button onClick={() => googleSignIn()}>Sign In With Google</button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
