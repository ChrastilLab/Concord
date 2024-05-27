// React Imports
import { Link } from "react-router-dom";

// Frontend Imports
import { Button } from "../../components/ui/button";
import MainNavBar from "../../components/MainNavBar/MainNavBar";
import SideBarNav from "./components/SideBar";
import ProjectsDisplay from "./components/ProjectsDisplay";

import {
  useSession,
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";

function HomePage() {
  const { isLoading } = useSessionContext();

  const session = useSession();
  const supabase = useSupabaseClient();

  if (isLoading) {
    return <></>;
  }

  async function handleGoogleSignIn() {

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        scopes:
          "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/docs  https://www.googleapis.com/auth/spreadsheets",
      },
    });

    if (error) {
      console.error(error);
    }
  }

  return (
    <div className="w-full h-screen flex flex-col px-4 py-2 lg:px-6">
      <MainNavBar />
      <main className="grow">
        {
          session ? (
            <div className="flex w-full h-full">
              <SideBarNav hidden={true}></SideBarNav>
              <ProjectsDisplay></ProjectsDisplay>
              <iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vT8l9l3h0_MPRxbnGLX-9qfJ0zAfJGkx7OfQUdCSjURDcKZQtEkHGIWiYwzbbG_aRhEtFRS1Q7Nx9wO/pubhtml?widget=true&amp;headers=false&rm=minimal&zoomScale=89" width="1000" height="500" title="Google Spreadsheet"></iframe>
            </div>
          ) : (
            <div className="flex flex-col w-full h-full justify-center items-center text-center">
              <div className="text-lg md:text-2xl lg:text-4xl font-bold">
                Your one-stop shop for lab productivity.
              </div>
              <div className="text-sm w-9/12 font-semibold pt-1 md:text-xl md:pt-1.5 lg:text-2xl lg: pt-2">
                A research-focused administrative website designed to optimize the management of concurrent projects.
              </div>
              <div className="flex justify-center pt-2 space-x-2 md:pt-3 md:space-x-3 lg:pt-4 lg:space-x-4">
                <Button type="button" variant = "outline" className="h-7.5 px-3 py-1.5 text-[0.625rem] font-semibold md:h-10 md:px-4 md:py-2 md:text-xs lg:text-sm">
                  <Link to="/aboutus">
                    About Us
                  </Link>
                </Button>
                <Button onClick={handleGoogleSignIn} type="button" className="h-7.5 px-3 py-1.5 text-[0.625rem] font-semibold md:h-10 md:px-4 md:py-2 md:text-xs lg:text-sm">
                  Log In
                </Button>
              </div>
            </div>
          )
        }
      </main>
    </div>
  );
}

export default HomePage;
