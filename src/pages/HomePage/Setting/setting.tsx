"use client";
import MainNavBar from "../../../components/MainNavBar/MainNavBar";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Label } from "../../../components/ui/label";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import ProfileAvatar from "./avatar";
import { useState } from "react";
import { useToast } from "../../../components/ui/use-toast";

const initialUserInfo = {
  username: "username...",
  about: "about...",
};

export default function SettingPage() {
  const [userInfo, setUserInfo] = useState(initialUserInfo);

  const { toast } = useToast();
  const handleSave = () => {
    toast({
      title: "Successfully Saved!",
      duration: 1500,
    });
  };

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { id, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [id]: value,
    }));
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <MainNavBar></MainNavBar>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Setting</h1>
        </div>

        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <Link to="">Edit Profile</Link>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>{userInfo.username}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid w-full items-center gap-4">
                  <ProfileAvatar></ProfileAvatar>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="username">Name</Label>
                    <Input
                      id="username"
                      defaultValue={userInfo.username}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="about">About</Label>
                    <Textarea
                      id="about"
                      defaultValue={userInfo.about}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline" onClick={handleSave}>
                  Save Change
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
