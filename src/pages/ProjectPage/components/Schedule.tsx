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

function Schedule() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Project Schedule</CardTitle>
                <CardDescription>
                    Show scheduled tasks and deadlines
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">TODO</CardContent>
            <CardFooter>{/* <Button></Button> */}</CardFooter>
        </Card>
    );
}

export default Schedule;
