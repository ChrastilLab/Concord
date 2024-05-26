"use client"

import * as React from "react";
import {
    ColumnDef,
} from "@tanstack/react-table";
import {ArrowUpDown, MoreHorizontal} from "lucide-react";

import {Button} from "src/components/ui/button";
import {Checkbox} from "src/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "src/components/ui/dropdown-menu";
import Task from "../../../types/Task";
import {TaskType} from "../../../types/ProjectEnums";


const columns: ColumnDef<Task>[] = [
    {
      id: "select",
      header: ({ table }) => (
          <Checkbox
              checked={
                  table.getIsAllPageRowsSelected() ||
                  (table.getIsSomePageRowsSelected() && "indeterminate")
              }
              onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
              aria-label="Select all"
          />
      ),
      cell: ({ row }) => (
          <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
          />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
          <div className="capitalize">{row.getValue("status")}</div>
      ),
    },
    {
      accessorKey: "taskName",
      header: ({ column }) => {
        return (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Task
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        );
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("taskName")}</div>,
    },
    {
      accessorKey: "type",
      header: () => <div className="text-right">Task Type</div>,
      cell: ({ row }) => {
        const type: string = row.getValue("type");
        return <div className="text-right font-medium">{type}</div>;
      },
    },
    {
      accessorKey: "assignedDate",
      header: () => <div className="text-right">Assigned</div>,
      cell: ({ row }) => {
        const date: Date = row.getValue("assignedDate");
        return <div className="text-right font-medium">{date.toISOString().split('T')[0]}</div>;
      },
    },
    {
      accessorKey: "startDate",
      header: () => <div className="text-right">Start Date</div>,
      cell: ({ row }) => {
        const type: TaskType = row.getValue("type");
        const startDate: Date | undefined = row.getValue("startDate");
  
        return (
            <div className="text-right font-medium">
              {type === TaskType.Deadline ? '-' : startDate?.toISOString().split('T')[0]}
            </div>
        );
      },
    },
  
    {
      accessorKey: "endDate",
      header: () => <div className="text-right">End Date</div>,
      cell: ({ row }) => {
        const date: Date = row.getValue("endDate");
        return <div className="text-right font-medium">{date.toISOString().split('T')[0]}</div>;
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const task: Task = row.original;
  
        return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                    onClick={() => navigator.clipboard.writeText(task.taskId.toString())}
                >
                  Copy Task ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>View customer</DropdownMenuItem>
                <DropdownMenuItem>View Task details</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        );
      },
    },
  ];


export default columns;