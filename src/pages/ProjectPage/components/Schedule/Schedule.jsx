import MainNavBar from "../../../../components/Navbar/MainNavBar";
import ProjectNavBar from "../ProjectNavBar/ProjectNavBar";
import { Separator } from "../../../../components/ui/separator";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Textarea } from "../../../../components/ui/textarea";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";

import {
  useSession,
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";

import { useEffect, useState } from "react";

import "./Schedule.css";

function Schedule() {
  const session = useSession(); // tokens, when session exists, we have a user
  const supabase = useSupabaseClient(); // talk to supabase
  const { isLoading } = useSessionContext();
  const createCalendarEvent = async () => {
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
      attendees: [{ email: "rsima@uci.edu" }],
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
  };

  return (
    <div className="project-page">
      <MainNavBar></MainNavBar>
      <div className="main">
        <ProjectNavBar></ProjectNavBar>
        <Separator></Separator>

        <div className="card-container">
          <Card>
            <CardHeader>
              <CardTitle>Schedule A Task</CardTitle>
              <CardDescription>Schedule a task for lab members</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <Label htmlFor="taskName">Task Name</Label>
                <Input id="taskName" placeholder="Task Name" />

                <Label htmlFor="taskName">Task Description</Label>
                <Textarea id="taskDescription" placeholder="Task Description" />
              </form>
            </CardContent>
            <CardFooter>
              <Button onClick={() => createCalendarEvent()}>
                Schedule Task
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Schedule;
