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

interface TaskProps {
    projectId: number;
}

function Tasks(props:TaskProps) {
    // console.log(props);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasks</CardTitle>
        <CardDescription>Tasks Component Here</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <TaskDisplay projectId={props.projectId}/>
      </CardContent>
      <CardFooter>
        <Button>IDK</Button>
      </CardFooter>
    </Card>
  );
}

export default Tasks;
