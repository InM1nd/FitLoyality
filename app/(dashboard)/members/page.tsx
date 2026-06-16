"use client";

import { Suspense } from "react";

import { PageHeading } from "@/components/layout/page-heading";
import { MembersTable } from "@/components/members/members-table";
import { Skeleton } from "@/components/ui/skeleton";
import { MEMBER_COUNTS } from "@/lib/data";
import { useT } from "@/lib/i18n/context";

export default function MembersPage() {
  const t = useT("members");
  return (
    <div className="flex flex-col gap-6">
      <PageHeading
        eyebrow={t("eyebrow")}
        title={t("memberCount", { n: String(MEMBER_COUNTS.all) })}
        description={t("desc")}
      />
      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <MembersTable />
      </Suspense>
    </div>
  );
}
