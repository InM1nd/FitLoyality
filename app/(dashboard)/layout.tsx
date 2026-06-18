import * as React from "react";

import { Shell } from "@/components/layout/shell";
import { StudioProfileProvider } from "@/hooks/use-studio-profile";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <StudioProfileProvider>
      <Shell>{children}</Shell>
    </StudioProfileProvider>
  );
}
