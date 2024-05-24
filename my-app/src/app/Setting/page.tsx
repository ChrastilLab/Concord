"use client";
import MainNavBar from "../MainNavBar";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { PencilRuler } from "lucide-react";
import { useState, useRef } from "react";

const userInfo = { username: "concord", about: "hi, here is..." };

export default function SettingPage() {
  const [profilePicture, setProfilePicture] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function handleAvatarClick() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <MainNavBar></MainNavBar>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Setting</h1>
        </div>

        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <div></div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>{userInfo.username}'s profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid w-full items-center gap-4">
                  <button className="w-20 h-20 flex flex-col space-y-1.5 relative group">
                    <Avatar
                      className="w-20 h-20 cursor-pointer group-hover:opacity-75 transition-opacity duration-100"
                      onClick={handleAvatarClick}
                    >
                      <AvatarImage src={profilePicture} />
                      <AvatarFallback>CN</AvatarFallback>
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-100">
                        <PencilRuler color="white" />
                      </div>
                    </Avatar>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </button>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input defaultValue={userInfo.username} />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="about">About</Label>
                    <Textarea id="about" defaultValue={userInfo.about} />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline">Save</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
