/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import React from "react";
import TableSkeleton from "../../skeleton-loaders/table-skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";

import { IconFolderCode } from "@tabler/icons-react";
import { ArrowUpRightIcon, Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "~/components/ui/empty";
import { DataTablePagination } from "~/components/table-pagination";
import StudentCreate from "../create-student-dialog";

interface PaginationProps {
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading: boolean;
  filtersToolbar?: React.ReactNode;
  pagination?: PaginationProps;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
}
export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  filtersToolbar,
  pagination,
  onPageChange,
  onPageSizeChange,
}: DataTableProps<TData, TValue>) {
  const { totalCount = 0, pageNumber = 1, pageSize = 10 } = pagination ?? {};

  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    state: {
      sorting,
      pagination: { pageIndex: pageNumber - 1, pageSize },
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  return (
    <div className="w-full space-y-2">
      <div className="block w-full lg:flex lg:items-center lg:justify-between">
        {filtersToolbar && <div className="flex-1"> {filtersToolbar}</div>}
      </div>
      {isLoading ? (
        <TableSkeleton columns={6} rows={10} />
      ) : (
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
                              header.getContext(),
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
                          cell.getContext(),
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
                    <Empty className="bg-white">
                      <EmptyHeader>
                        <EmptyMedia variant="icon">
                          <IconFolderCode />
                        </EmptyMedia>
                        <EmptyTitle>No Data Yet</EmptyTitle>
                        <EmptyDescription>
                          You haven&apos;t created any data yet. Get started by
                          creating your first data.
                        </EmptyDescription>
                      </EmptyHeader>
                      {/* <EmptyContent>
                        <div className="flex gap-2">
                          <StudentCreate />
                        </div>
                      </EmptyContent> */}
                    </Empty>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
      <DataTablePagination
        table={table}
        pageNumber={pageNumber}
        pageSize={pageSize}
        totalCount={totalCount}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
}
