import type { StudentType } from "~/types/api.types";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { LockIcon, Pencil, Trash } from "lucide-react";
import { Button } from "../ui/button";

export default function EditAccountStudentForm({
  user,
}: {
  user: StudentType;
}) {
  return (
    <div>
      <h1 className="text-center text-xl font-semibold sm:text-left">
        Account Settings
      </h1>
      <p className="text-muted-foreground text-sm leading-tight">
        Manage your account preferences
      </p>

      <Separator className="my-4" />
      <div className="flex items-center justify-between gap-10">
        <div>
          <h1 className="text-center text-xl font-semibold sm:text-left">
            Account Status
          </h1>
          <p className="text-muted-foreground text-sm leading-tight">
            Your account status is currently{" "}
            <span className="lowercase">{user.statusAccount}</span>
          </p>
        </div>
        <Badge variant={user.statusAccount.toLowerCase()}>
          {user.statusAccount}
        </Badge>
      </div>
      <Separator className="my-4" />
      <div className="flex items-center justify-between gap-10">
        <div>
          <h1 className="text-center text-xl font-semibold sm:text-left">
            Email Address
          </h1>
          <p className="text-muted-foreground text-sm leading-tight">
            The Email is associated with your account
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-medium">{user.email}</span>
          <Badge variant={"outline"} className="p-2">
            <Pencil />
            Edit
          </Badge>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="flex items-center justify-between gap-10">
        <div>
          <h1 className="text-center text-xl font-semibold sm:text-left">
            Password
          </h1>
          <p className="text-muted-foreground text-sm leading-tight">
            Change your account password regularly to keep your account secure
          </p>
        </div>
        <Badge variant={"outline"} className="p-2">
          <LockIcon />
          Change Password
        </Badge>
      </div>
      <Separator className="my-4" />
      <div className="flex items-center justify-between gap-10">
        <div>
          <h1 className="text-center text-xl font-semibold sm:text-left">
            Delete Account
          </h1>
          <p className="text-muted-foreground text-sm leading-tight">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
        </div>
        <Button variant={"destructive"}>
          <Trash />
          Delete Account
        </Button>
      </div>
    </div>
  );
}
