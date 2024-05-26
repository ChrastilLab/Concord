import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../../components/ui/card";

// import { Button } from "../../../components/ui/button";
import React from "react";

function Settings() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Project Settings</CardTitle>
                <CardDescription>
                    Change project settings and manage members.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">TODO</CardContent>
            <CardFooter>{/* <Button>Save changes</Button> */}</CardFooter>
        </Card>
    );
}

export default Settings;
