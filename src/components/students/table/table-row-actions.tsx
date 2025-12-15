import type { Row } from "@tanstack/react-table";
import { Eye, MoreHorizontal, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import type { StudentType } from "~/types/api.types";

interface DataTableRowActionsProps {
  row: Row<StudentType>;
}
export default function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const router = useRouter();

  const student = row.original.id;

  const handleEdit = (studentId: string) => {
    router.push(`/students/${studentId}`);
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted flex h-8 w-8 p-0"
          >
            <MoreHorizontal />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          {/* Edit Task Option */}
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => handleEdit(student)}
          >
            <Pencil className="mr-2 h-4 w-4" /> Edit Student
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            // onClick={() => setOpenEditDialog(true)}
          >
            <Eye className="mr-2 h-4 w-4" /> Detail Student
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          {/* Delete Task Option */}
          <DropdownMenuItem
            className="!text-destructive cursor-pointer"
            // onClick={() => setOpenDialog(true)}
          >
            Delete Student
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
