import { Skeleton } from "~/components/ui/skeleton";
import { Loader } from "lucide-react";
import { Card } from "../ui/card";

export function DashboardSkeleton() {
  return (
    <div>
      {/* Loader on top */}
      {/* <div className="absolute inset-0 z-50 flex items-start justify-center bg-[rgba(255,255,255,.01)] pt-10">
        <div className="flex items-center space-x-2">
          <Loader size="25px" className="animate-spin" />
          <span className="text-sm font-medium">WorkNest...</span>
        </div>
      </div> */}

      {/* Main layout */}
      <div className="space-y-3">
        <Card>
          <div className="flex items-center gap-4 p-4">
            <Skeleton className="h-30 w-30 rounded-full" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-6 w-1/4 rounded-lg" />
              <Skeleton className="h-6 w-1/4 rounded-lg" />
              <Skeleton className="h-6 w-1/4 rounded-lg" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4 p-4">
            <Skeleton className="h-8 w-full rounded-lg" />
            <Skeleton className="h-8 w-full rounded-lg" />
          </div>
          <div className="flex items-center gap-4 p-4">
            <Skeleton className="h-8 w-full rounded-lg" />
            <Skeleton className="h-8 w-full rounded-lg" />
          </div>
          <div className="flex items-center gap-4 p-4">
            <Skeleton className="h-8 w-full rounded-lg" />
            <Skeleton className="h-8 w-full rounded-lg" />
          </div>
          <div className="flex items-center gap-4 p-4">
            <Skeleton className="h-8 w-full rounded-lg" />
            <Skeleton className="h-8 w-full rounded-lg" />
          </div>
          <div className="flex justify-end pr-4">
            <Skeleton className="h-10 w-32 rounded-lg" />
          </div>
        </Card>
      </div>
    </div>
  );
}
