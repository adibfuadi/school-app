import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
  BadgeAlertIcon,
  BadgeCheckIcon,
  GraduationCap,
  Loader,
  Mars,
  ShieldBanIcon,
  ShieldMinus,
  Venus,
} from "lucide-react";
import { api } from "~/trpc/react";

const StudentsAnalytic = () => {
  const getStudentAnalytics = api.student.getStudentStats.useQuery();

  const stats = getStudentAnalytics.data;
  return (
    <div className="grid grid-cols-4 gap-4">
      <Card className="text-accent-foreground">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Mars className="size-5" />
            <p className="text-sm">Male</p>
          </div>
        </CardHeader>
        <CardContent className="-mt-4">
          {getStudentAnalytics.isLoading ? (
            <Loader className="h-6 w-6 animate-spin" />
          ) : (
            <p className="text-2xl font-medium">{stats?.male}</p>
          )}
        </CardContent>
      </Card>
      <Card className="text-accent-foreground">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Venus className="size-5" />
            <p className="text-sm">Female</p>
          </div>
        </CardHeader>
        <CardContent className="-mt-4">
          {getStudentAnalytics.isLoading ? (
            <Loader className="h-6 w-6 animate-spin" />
          ) : (
            <p className="text-2xl font-medium">{stats?.female}</p>
          )}
        </CardContent>
      </Card>
      <Card className="text-accent-foreground">
        <CardHeader>
          <div className="flex items-center gap-4">
            <BadgeCheckIcon className="size-5 text-green-500" />
            <p className="text-sm">Actived</p>
          </div>
        </CardHeader>
        <CardContent className="-mt-4">
          {getStudentAnalytics.isLoading ? (
            <Loader className="h-6 w-6 animate-spin" />
          ) : (
            <p className="text-2xl font-medium">{stats?.registered}</p>
          )}
        </CardContent>
      </Card>
      <Card className="text-accent-foreground">
        <CardHeader>
          <div className="flex items-center gap-4">
            <BadgeAlertIcon className="size-5 text-red-500" />
            <p className="text-sm">Inactive</p>
          </div>
        </CardHeader>
        <CardContent className="-mt-4">
          {getStudentAnalytics.isLoading ? (
            <Loader className="h-6 w-6 animate-spin" />
          ) : (
            <p className="text-2xl font-medium">{stats?.notRegistered}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentsAnalytic;
