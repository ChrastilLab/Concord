import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import MainNavBar from "../../components/MainNavBar/MainNavBar";
import HomeNavBar from "./components/HomeNavBar";

import {
  useSession,
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";

function HomePage() {
  const { isLoading } = useSessionContext();

  const session = useSession();
  const supabase = useSupabaseClient();
  const navigate = useNavigate();

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
    <div className="flex min-h-screen w-full flex-col">
      <MainNavBar />
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        {session ? (
          <>
            <div className="mx-auto grid w-full max-w-6xl gap-2">
              <h1 className="text-3xl font-semibold">Home</h1>
            </div>
            <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
              <HomeNavBar />
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
                  <CardHeader className="pb-3">
                    <CardTitle>Your Projects</CardTitle>
                    <CardDescription className="max-w-lg text-balance leading-relaxed">
                      Here is where all of your projects are listed. You can
                      create one by clicking on button below.
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button>Create New Project</Button>
                  </CardFooter>
                </Card>
                <Card x-chunk="dashboard-05-chunk-1">
                  <CardHeader className="pb-2">
                    <CardDescription>Project 1</CardDescription>
                    <CardTitle className="text-4xl">
                      <Link
                        to="/project"
                        className="transition-colors hover:text-foreground"
                      >
                        Project 1 Name
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground">
                      Lead by xxx
                    </div>
                  </CardContent>
                  <CardFooter>
                    {/* <Progress value={25} aria-label="25% increase" /> */}
                  </CardFooter>
                </Card>
                <Card x-chunk="dashboard-05-chunk-2">
                  <CardHeader className="pb-2">
                    <CardDescription>Project 2</CardDescription>
                    <CardTitle className="text-4xl">
                      <Link
                        to="/project"
                        className="transition-colors hover:text-foreground"
                      >
                        Project 2 Name
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground">
                      Lead by xxx
                    </div>
                  </CardContent>
                  <CardFooter>
                    {/* <Progress value={12} aria-label="12% increase" /> */}
                  </CardFooter>
                </Card>
                <iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vT8l9l3h0_MPRxbnGLX-9qfJ0zAfJGkx7OfQUdCSjURDcKZQtEkHGIWiYwzbbG_aRhEtFRS1Q7Nx9wO/pubhtml?widget=true&amp;headers=false&rm=minimal&zoomScale=89" width="1000" height="500" title="Google Spreadsheet"></iframe>              
                </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col flex-1 justify-around items-center p-2.5   h-full">
            {/* <div className="flex justify-around items-center p-4 rounded gap-5">
              
            </div> */}
            <div>Manage Your Lab like Never Before</div>
            <div>Get Started Now</div>
            <Button>Login</Button>
            {/* I need to assign this click to handleGoogleSignIn() idk how to do that tho */}

            {/* <div className="flex justify-around items-center bg-white p-4 shadow rounded gap-5 ">
              
            </div> */}
          </div>
        )}
      </main>
    </div>
  );
}

export default HomePage;
