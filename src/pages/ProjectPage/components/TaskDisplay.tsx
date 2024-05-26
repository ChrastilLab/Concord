"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {ArrowUpDown, ChevronDown, MoreHorizontal} from "lucide-react";

import {Button} from "src/components/ui/button";
import {Checkbox} from "src/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "src/components/ui/dropdown-menu";
import {Input} from "src/components/ui/input";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "src/components/ui/table";
import Task from "../../../types/Task";
import {ProjectStatus, ProjectType} from "../../../types/ProjectEnums";

const data: Task[] = [
  {
    projectId:1,
    taskId: 1,
    status: ProjectStatus.Completed,
    taskName: "TaskExample1",
    type: ProjectType.Deadline,
    endDate: new Date("2024-06-15T09:00:00Z"),
    assignedDate: new Date("2024-05-25T15:00:00Z")
  },
  {
    projectId:1,
    taskId: 2,
    status: ProjectStatus.NotStarted,
    taskName: "Lab Session 1",
    type: ProjectType.Scheduled,
    startDate: new Date("2024-05-27T09:00:00Z"),
    endDate: new Date("2024-05-27T11:00:00Z"),
    assignedDate: new Date("2024-05-20T11:00:00Z")
  },
  {
    projectId:1,
    taskId: 3,
    status: ProjectStatus.NotStarted,
    taskName: "Lab Session 2",
    type: ProjectType.Scheduled,
    startDate: new Date("2024-05-29T13:00:00Z"),
    endDate: new Date("2024-05-29T15:00:00Z"),
    assignedDate: new Date("2024-05-20T11:00:00Z")
  },
  {
    projectId:1,
    taskId: 4,
    status: ProjectStatus.InProgress,
    taskName: "Write report",
    type: ProjectType.Deadline,
    endDate: new Date("2024-06-09T04:20:00Z"),
    assignedDate: new Date("2024-04-20T11:00:00Z")
  },
  {
    projectId:1,
    taskId: 5,
    status: ProjectStatus.Completed,
    taskName: "Analyze Data",
    type: ProjectType.Deadline,
    endDate: new Date("2024-04-13T03:30:00Z"),
    assignedDate: new Date("2024-04-01T08:00:00Z")
  },
];



export const columns: ColumnDef<Task>[] = [
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
      const type: ProjectType = row.getValue("type");
      const startDate: Date | undefined = row.getValue("startDate");

      return (
          <div className="text-right font-medium">
            {type === ProjectType.Deadline ? '-' : startDate?.toISOString().split('T')[0]}
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

export function TaskDisplay() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter Task..."
          value={(table.getColumn("taskName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("taskName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
