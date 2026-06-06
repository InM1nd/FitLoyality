import { Suspense } from "react";

import { PageHeading } from "@/components/layout/page-heading";
import { MembersTable } from "@/components/members/members-table";
import { Skeleton } from "@/components/ui/skeleton";
import { MEMBER_COUNTS } from "@/lib/mock-data";

export default function MembersPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeading
        eyebrow="Workspace"
        title={`${MEMBER_COUNTS.all} Members`}
        description="Every member, sortable and searchable. Click a row to open their full profile."
      />
      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <MembersTable />
      </Suspense>
    </div>
  );
}
