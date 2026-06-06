"use client";

import * as React from "react";
import { Plus } from "lucide-react";

import { PageHeading } from "@/components/layout/page-heading";
import { Button } from "@/components/ui/button";
import { RewardCard } from "@/components/rewards/reward-card";
import { CreateRewardModal } from "@/components/rewards/create-reward-modal";
import { REWARDS } from "@/lib/mock-data";
import type { Reward } from "@/lib/types";

export function RewardsView() {
  const [rewards, setRewards] = React.useState<Reward[]>(REWARDS);
  const [createOpen, setCreateOpen] = React.useState(false);

  const activeCount = rewards.filter((r) => r.enabled).length;

  const toggle = (id: string, enabled: boolean) =>
    setRewards((prev) => prev.map((r) => (r.id === id ? { ...r, enabled } : r)));

  const create = (reward: Reward) => setRewards((prev) => [reward, ...prev]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeading
        eyebrow="Workspace"
        title="Rewards"
        description={`${activeCount} active · automated perks that keep members coming back.`}
        action={
          <Button onClick={() => setCreateOpen(true)}>
            <Plus /> Create Reward
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {rewards.map((reward) => (
          <RewardCard key={reward.id} reward={reward} onToggle={toggle} />
        ))}
      </div>

      <CreateRewardModal open={createOpen} onOpenChange={setCreateOpen} onCreate={create} />
    </div>
  );
}
