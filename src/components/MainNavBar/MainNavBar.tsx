import React from "react";
import { useEffect, useState } from "react";
import { CircleUser, Menu, Brain, Search } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate, Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

import PersonalInfo from "../PersonalInfoPopover/PersonalInfo";

function MainNavBar() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const navigate = useNavigate();

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

  async function signOut() {
    await supabase.auth.signOut().then(() => {
      navigate("/");
    });
  }

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          to={"/"}
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Brain className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
          Concord
        </Link>
        {/* <Link
          href="/"
          className="text-foreground transition-colors hover:text-foreground"
        >
          Home
        </Link> */}
        {/* <Link
          href="/Project"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Project
        </Link> */}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              to={"/"}
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Brain className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
              Concord
            </Link>
            {/* <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <Link
              href="/Project"
              className="text-muted-foreground hover:text-foreground"
            >
              Project
            </Link> */}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            {session ? (
              <>
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search project..."
                  className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                />
              </>
            ) : (
              <></>
            )}
          </div>
        </form>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuLabel>
              {session ? session.user.email : ""}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            {session ? (
              <DropdownMenuItem
                onClick={() => {
                  signOut();
                }}
              >
                Logout
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                onClick={() => {
                  handleGoogleSignIn();
                }}
              >
                Login
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        {/*<PersonalInfo/>*/}
      </div>
    </header>
  );
}

export default MainNavBar;
