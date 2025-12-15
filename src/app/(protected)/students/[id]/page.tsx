"use client";
import { IconWorld } from "@tabler/icons-react";
import { format } from "date-fns";
import {
  BadgeCheckIcon,
  Book,
  Calendar,
  Calendar1Icon,
  CheckCircle,
  Mail,
  Map,
  NotepadText,
  Paperclip,
  Pencil,
  Phone,
  SpeakerIcon,
} from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import { DashboardSkeleton } from "~/components/skeleton-loaders/dashboard-skeleton";
import EditAccountStudentForm from "~/components/students/edit-account-student-form";
import EditStudentForm from "~/components/students/edit-student-form";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent } from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { api } from "~/trpc/react";

const EditStudentPage = () => {
  const params = useParams();
  const id = params.id as string;

  const { data: student, isLoading } = api.student.getStudentById.useQuery({
    id,
  });
  return (
    <div>
      {isLoading ? (
        <>
          <DashboardSkeleton />
        </>
      ) : (
        <>
          <Card>
            <CardContent>
              <div className="flex items-center gap-4 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-30 w-30">
                  <AvatarFallback className="bg-background text-4xl text-black">
                    {student?.firstName.charAt(0) ?? "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 gap-2 text-left">
                  <span className="flex items-center gap-2 truncate text-2xl font-bold">
                    {`${student?.firstName} ${student?.lastName}`}
                    <Badge variant={student?.statusAccount.toLocaleLowerCase()}>
                      <BadgeCheckIcon />
                      {student?.statusAccount}
                    </Badge>
                  </span>
                  <span className="flex items-center gap-1 truncate">
                    <Mail className="size-4" />
                    {student?.email}
                  </span>
                  <div className="flex gap-4">
                    <span className="flex items-center gap-1 truncate">
                      <Map className="size-4" />
                      {student?.address}
                    </span>
                    <span className="flex items-center gap-1 truncate">
                      <Calendar className="size-4" />
                      Joined{" "}
                      {student?.createdAt
                        ? format(student.createdAt, "PPP")
                        : null}
                    </span>
                    <span className="flex items-center gap-1 truncate">
                      <Phone className="size-4" />
                      {student?.phone}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs className="mt-4" defaultValue="generalData">
            <Card>
              <CardContent>
                <TabsList className="flex w-full justify-between">
                  <TabsTrigger value="generalData" name="General Data">
                    <Paperclip />
                  </TabsTrigger>
                  <TabsTrigger value="account" name="Account">
                    <BadgeCheckIcon />
                  </TabsTrigger>
                  <TabsTrigger value="subject" name="Subject">
                    <Book />
                  </TabsTrigger>
                  <TabsTrigger value="schedulle" name="Schedulle">
                    <Calendar1Icon />
                  </TabsTrigger>
                  <TabsTrigger value="attendance" name="Attendance">
                    <SpeakerIcon />
                  </TabsTrigger>
                  <TabsTrigger value="assignments" name="Assignments">
                    <NotepadText />
                  </TabsTrigger>
                  <TabsTrigger value="result" name="Result">
                    <CheckCircle />
                  </TabsTrigger>
                </TabsList>
              </CardContent>
            </Card>
            <TabsContent value="generalData">
              <Card>
                <CardContent>
                  <EditStudentForm student={student} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="account">
              <Card>
                <CardContent>
                  <EditAccountStudentForm user={student} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default EditStudentPage;
