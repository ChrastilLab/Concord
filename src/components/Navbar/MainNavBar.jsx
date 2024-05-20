import "./MainNavBar.css";
import { Button, buttonVariants } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { LogInIcon, NetworkIcon, UsersIcon, LogOutIcon } from "lucide-react";
import { DashboardIcon, PersonIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import {
  useSession,
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";

import { useEffect, useState } from "react";

function MainNavBar() {
  console.log("MainNavBar render");

  let navigate = useNavigate();

  const session = useSession(); // tokens, when session exists, we have a user
  const supabase = useSupabaseClient(); // talk to supabase
  const { isLoading } = useSessionContext();

  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  const { toast } = useToast();

  function handleNavigate(path) {
    navigate(path);
  }

  const handleGoogleSignIn = async () => {
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
  };

  const signOut = async () => {
    await supabase.auth
      .signOut()
      // the rest isn't working for some reason but dw abt it for now
      .then(
        toast({
          description: "Logged Out",
        })
      )
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Error logging out.",
        });
      });

    toast({
      description: "Logged Out",
    });
  };

  return (
    <>
      <div className="main-nav-bar">
        <h1>Logo</h1>
        <div className="button-container">
          <Button
            className="nav-button"
            variant="outline"
            onClick={() => handleNavigate("/")}
          >
            <DashboardIcon />
            &nbsp;
            <p>Home</p>
          </Button>

          <Button
            className="nav-button"
            variant="outline"
            onClick={() => handleNavigate("/project")}
          >
            <NetworkIcon />
            &nbsp;
            <p>Project</p>
          </Button>

          <Button
            className="nav-button"
            variant="outline"
            onClick={() => handleNavigate("/person")}
          >
            <PersonIcon />
            &nbsp;
            <p>Person</p>
          </Button>

          <div className="auth-button-container">
            {session ? (
              <>
                <Button
                  className="nav-button"
                  variant="outline"
                  onClick={() => signOut()}
                >
                  <LogOutIcon />
                  &nbsp; &nbsp;
                  <p>Logout</p>
                </Button>
              </>
            ) : (
              <>
                <Button
                  className="nav-button"
                  variant="outline"
                  onClick={() => handleGoogleSignIn()}
                >
                  <LogInIcon />
                  &nbsp; &nbsp;
                  <p>Login</p>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MainNavBar;
