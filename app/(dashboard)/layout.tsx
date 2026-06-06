import * as React from "react";

import { Shell } from "@/components/layout/shell";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <Shell>{children}</Shell>;
}
