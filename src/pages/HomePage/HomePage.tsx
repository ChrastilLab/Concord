import { Button } from "../../components/ui/button";

import MainNavBar from "../../components/MainNavBar/MainNavBar";
import HomeNavBar from "./components/HomeNavBar";
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
          "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/docs",
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
              <ProjectsDisplay />
            </div>
          </>
        ) : (
          <div className="flex flex-col justify-around items-center p-2.5 h-full">
            <div className="text-xl font-semibold mb-4">
              Mange your lab seamlessly.
            </div>
            <Button onClick={handleGoogleSignIn} type="button">
              Get Started Now
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}

export default HomePage;
