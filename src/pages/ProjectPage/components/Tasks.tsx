import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

import { Button } from "../../../components/ui/button";
function Tasks() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasks</CardTitle>
        <CardDescription>Tasks Component Here</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">Task Component Content</CardContent>
      <CardFooter>
        <Button>Idk</Button>
      </CardFooter>
    </Card>
  );
}

export default Tasks;
