import {
  ArrowRight,
  GraduationCap,
  Plus,
  User,
  User2,
  UserCheck2,
  UserCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import React from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";

const DashboardPage = () => {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Workspace Overview
          </h2>
          <p className="text-muted-foreground">
            Here&apos;s an overview for this workspace!
          </p>
        </div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="This month" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Years</SelectLabel>
              <SelectItem value="apple">Jan</SelectItem>
              <SelectItem value="banana">Feb</SelectItem>
              <SelectItem value="blueberry">Mar</SelectItem>
              <SelectItem value="grapes">Apr</SelectItem>
              <SelectItem value="pineapple">Mei</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <Card className="text-accent-foreground">
          <CardHeader>
            <div className="flex items-center gap-4">
              <GraduationCap className="size-5 text-green-500" />
              <p className="text-sm">Students</p>
            </div>
          </CardHeader>
          <CardContent className="-mt-4">
            <div className="flex items-center justify-between">
              <p className="text-2xl font-medium">100</p>
              <ArrowRight className="size-5" />
            </div>
          </CardContent>
        </Card>
        <Card className="text-accent-foreground">
          <CardHeader>
            <div className="flex items-center gap-4">
              <User className="size-5 text-red-500" />
              <p className="text-sm">Teachers</p>
            </div>
          </CardHeader>
          <CardContent className="-mt-4">
            <div className="flex items-center justify-between">
              <p className="text-2xl font-medium">53</p>
              <ArrowRight className="size-5" />
            </div>
          </CardContent>
        </Card>
        <Card className="text-accent-foreground">
          <CardHeader>
            <div className="flex items-center gap-4">
              <UserCircle className="size-5 text-red-500" />
              <p className="text-sm">Parents</p>
            </div>
          </CardHeader>
          <CardContent className="-mt-4">
            <div className="flex items-center justify-between">
              <p className="text-2xl font-medium">100</p>
              <ArrowRight className="size-5" />
            </div>
          </CardContent>
        </Card>
        <Card className="text-accent-foreground">
          <CardHeader>
            <div className="flex items-center gap-4">
              <UserCheck2 className="size-5 text-red-500" />
              <p className="text-sm">Admins</p>
            </div>
          </CardHeader>
          <CardContent className="-mt-4">
            <div className="flex items-center justify-between">
              <p className="text-2xl font-medium">10</p>
              <ArrowRight className="size-5" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
