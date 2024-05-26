import { TaskDisplay } from "./TaskDisplay";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

import { Button } from "../../../components/ui/button";

function Tasks(props:any) {
    console.log(props);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasks</CardTitle>
        <CardDescription>Tasks Component Here</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <TaskDisplay />
      </CardContent>
      <CardFooter>
        <Button>IDK</Button>
      </CardFooter>
    </Card>
  );
}

export default Tasks;
