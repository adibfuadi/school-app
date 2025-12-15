"use client";
import { Plus } from "lucide-react";
import React from "react";
import TableSkeleton from "~/components/skeleton-loaders/table-skeleton";
import StudentCreate from "~/components/students/create-student-dialog";
import StudentsAnalytic from "~/components/students/student-analytics";
import TableStudent from "~/components/students/table-students";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { api } from "~/trpc/react";

const StudentPage = () => {
  return (
    <div className="h-full w-full flex-col space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-medium tracking-tight">
            List of Students
          </h2>
          <p className="text-muted-foreground">
            Here is the list of all students enrolled in the school.
          </p>
        </div>
        <StudentCreate />
      </div>
      <div className="space-y-4">
        <StudentsAnalytic />
        <Card className="w-full shadow-none">
          <CardContent className="w-full pt-6">
            <TableStudent />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentPage;
