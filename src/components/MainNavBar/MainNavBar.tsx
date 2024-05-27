// React Imports
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// Frontend Imports
import { CircleUser, Menu, Brain, Search } from "lucide-react";

import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

import SideBarNav from "../../pages/HomePage/components/SideBar"

// Backend Imports
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

function MainNavBar() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const navigate = useNavigate();

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

  async function signOut() {
    await supabase.auth.signOut().then(() => {
      navigate("/");
    });
  }

  return (
    <header className="h-16 sticky flex items-center text-xs md:text-sm lg:text-lg font-semibold">
      <nav className="hidden md:flex md:items-center">
        <Link to="/" className="flex items-center gap-2 ">
          <Brain className="h-6 w-6" />
          <span className="sr-only"> Concord </span>
          Concord
        </Link>
      </nav>
      <Sheet>
        {/* TODO: Remove border on the close button when the user menu is expanded. */}
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only"> Toggle navigation menu. </span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="w-full h-full flex flex-col">
            <nav className="h-16 flex items-center text-lg font-semibold">
              <Link to="/" className="flex items-center gap-2">
                <Brain className="h-6 w-6" />
                <span className="sr-only"> Concord </span>
                Concord
              </Link>
            </nav>
            <SideBarNav hidden={false}></SideBarNav>
          </div>
        </SheetContent>
      </Sheet>
      <div className="flex items-center gap-4 ml-auto">
        <form className="flex items-center flex-1 relative">
          {session ? (
            <>
              <Search className="h-4 w-4 absolute left-2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search project..."
                className="pl-8 w-[250px] lg:w-[300px]"
              />
            </>
          ) : (
            <></>
          )}
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only"> Toggle user menu. </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            {
              session ? (
                <DropdownMenuLabel> {session.user.email} </DropdownMenuLabel>
              ) : (
                <></>
              )
            }
            <DropdownMenuSeparator />
            <DropdownMenuItem> 
              Settings
              <span className="sr-only"> Toggle user settings. </span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Support
              <span className="sr-only"> Toggle website support. </span>
              </DropdownMenuItem>
            <DropdownMenuSeparator />
            {session ? (
              <DropdownMenuItem onClick={signOut}>
                Logout
              </DropdownMenuItem>
            ) : (
              // TODO: Remove border on the user button when the user menu is expanded.
              <DropdownMenuItem onClick={handleGoogleSignIn}>
                Login
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default MainNavBar;
