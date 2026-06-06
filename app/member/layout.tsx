import * as React from "react";
import type { Metadata } from "next";

import { PhoneShell } from "@/components/member/phone-shell";

export const metadata: Metadata = {
  title: "FitLoyalty — Member App",
  description: "The branded member experience: points, streaks, challenges and rewards.",
};

export default function MemberLayout({ children }: { children: React.ReactNode }) {
  return <PhoneShell>{children}</PhoneShell>;
}
