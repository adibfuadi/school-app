/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { DataTableColumnHeader } from "./table-column-header";
import { Checkbox } from "~/components/ui/checkbox";
import { Badge } from "~/components/ui/badge";
import type { StudentType } from "~/types/api.types";
import DataTableRowActions from "./table-row-actions";
import { BadgeAlertIcon, BadgeCheckIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";

export const getColumns = (): ColumnDef<StudentType>[] => {
  const columns: ColumnDef<StudentType>[] = [
    {
      id: "id",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ??
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "firstName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar>
              <AvatarFallback className="bg-background text-black">
                {row.original.firstName.charAt(0) ?? "U"}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">
                {`${row.original.firstName} ${row.original.lastName}`}
              </span>
              <span className="truncate text-xs">{row.original.email}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "birthDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Birth Date" />
      ),
      cell: ({ row }) => {
        return (
          <span className="text-sm lg:max-w-[100px]">
            {row.original.birthDate
              ? format(row.original.birthDate, "PPP")
              : null}
          </span>
        );
      },
    },
    {
      accessorKey: "phone",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Phone Number" />
      ),
      cell: ({ row }) => {
        return (
          <span className="text-sm lg:max-w-[100px]">{row.original.phone}</span>
        );
      },
    },
    {
      accessorKey: "gender",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Gender" />
      ),
      cell: ({ row }) => {
        return (
          <span className="text-sm lg:max-w-[100px]">
            {row.original.gender}
          </span>
        );
      },
    },
    {
      accessorKey: "address",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Address" />
      ),
      cell: ({ row }) => {
        return (
          <span className="text-sm lg:max-w-[100px]">
            {row.original.address}
          </span>
        );
      },
    },
    {
      accessorKey: "userId",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status Account" />
      ),
      cell: ({ row }) => {
        const variant = row.original.userId ? "active" : "inactive";
        return (
          <span className="text-sm lg:max-w-[100px]">
            <Badge
              variant={variant}
              className="text-[10px] font-normal uppercase"
            >
              {row.original.userId ? <BadgeCheckIcon /> : <BadgeAlertIcon />}
              {row.original.userId ? "Actived" : "Inactive"}
            </Badge>
          </span>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <>
            <DataTableRowActions row={row} />
          </>
        );
      },
    },
  ];

  return columns;
};
