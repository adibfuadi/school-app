/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { type FC } from "react";
import { api } from "~/trpc/react";
import type { StudentType } from "~/types/api.types";
import { DataTable } from "./table/table";
import { getColumns } from "./table/column";
import { Input } from "../ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { Search, X } from "lucide-react";
import useStudentTableFilter from "~/hooks/use-task-table-filter";
import { DataTableFacetedFilter } from "./table/table-faceted-filter";
import { genders, statuses } from "./table/data";
import { Button } from "../ui/button";

type Filters = ReturnType<typeof useStudentTableFilter>[0];
type SetFilters = ReturnType<typeof useStudentTableFilter>[1];

interface DataTableFilterToolbarProps {
  isLoading?: boolean;
  filters: Filters;
  setFilters: SetFilters;
}

const TableStudent = () => {
  const columns = getColumns();
  const [pageNumber, setPageNumber] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  const [filters, setFilters] = useStudentTableFilter();

  const { data, isLoading } = api.student.getStudent.useQuery({
    page: pageNumber,
    limit: pageSize,
    keyword: filters.keyword ?? "",
    status: filters.status ?? "",
  });

  const students: StudentType[] = data?.data ?? [];
  const totalCount = data?.total ?? 0;

  const handlePageChange = (page: number) => {
    setPageNumber(page);
  };

  // Handle page size changes
  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
  };

  return (
    <div className="relative w-full">
      <DataTable
        isLoading={isLoading}
        data={students}
        columns={columns}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        pagination={{
          totalCount,
          pageNumber,
          pageSize,
        }}
        filtersToolbar={
          <DataTableFilterToolbar
            isLoading={isLoading}
            filters={filters}
            setFilters={setFilters}
          />
        }
      />
    </div>
  );
};

const DataTableFilterToolbar: FC<DataTableFilterToolbarProps> = ({
  isLoading,
  filters,
  setFilters,
}) => {
  const handleFilterChange = (key: keyof Filters, values: string[]) => {
    setFilters({
      ...filters,
      [key]: values.length > 0 ? values.join(",") : null,
    });
  };

  return (
    <div className="mb-2 flex w-full flex-col items-start space-y-2 lg:mb-0 lg:flex-row lg:space-y-0 lg:space-x-2">
      <InputGroup className="w-full lg:w-[250px]">
        <InputGroupInput
          placeholder="Filter students..."
          value={filters.keyword ?? ""}
          onChange={(e) =>
            setFilters({
              keyword: e.target.value,
            })
          }
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>

      <DataTableFacetedFilter
        title="Status"
        multiSelect={true}
        options={statuses}
        disabled={isLoading}
        selectedValues={filters.status?.split(",") ?? []}
        onFilterChange={(values) => handleFilterChange("status", values)}
      />
      <DataTableFacetedFilter
        title="Gender"
        multiSelect={true}
        options={genders}
        disabled={isLoading}
        selectedValues={filters.gender?.split(",") ?? []}
        onFilterChange={(values) => handleFilterChange("gender", values)}
      />

      {Object.values(filters).some(
        (value) => value !== null && value !== "",
      ) && (
        <Button
          disabled={isLoading}
          variant="ghost"
          className="h-8 px-2 lg:px-3"
          onClick={() =>
            setFilters({
              keyword: null,
              status: null,
            })
          }
        >
          Reset
          <X />
        </Button>
      )}
    </div>
  );
};

export default TableStudent;
