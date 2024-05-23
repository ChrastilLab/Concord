import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function AssignedTask() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Assigned Task...</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Tasks</h4>
            <p className="text-sm text-muted-foreground">
              Assigned tasks to lab members.
            </p>
          </div>

          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="assginees">Assginees</Label>
              <Input
                id="assginees"
                defaultValue="..."
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="timeRange">Time Range</Label>
              <Input
                id="timeRange"
                defaultValue="..."
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="taskName">Task Name</Label>
              <Input
                id="taskName"
                defaultValue="..."
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="assigner">Assigner</Label>
              <Input
                id="assigner"
                defaultValue="..."
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                defaultValue="..."
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="status">Status</Label>
              <Input
                id="status"
                defaultValue="..."
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="Tags">Tags</Label>
              <Input id="Tags" className="col-span-2 h-8" />
            </div>
            <div className="flex justify-end">
              <Button variant="outline">Add</Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
