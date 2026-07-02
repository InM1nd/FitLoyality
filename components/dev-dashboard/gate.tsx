"use client";

import * as React from "react";
import { Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AUTH_SESSION_KEY = "fitloyalty-dev-dashboard-auth";
const AUTH_CHANGED_EVENT = "fitloyalty:dev-dashboard-auth-changed";

const emptySubscribe = () => () => {};

function subscribeToAuth(callback: () => void) {
  window.addEventListener(AUTH_CHANGED_EVENT, callback);
  return () => window.removeEventListener(AUTH_CHANGED_EVENT, callback);
}

function readAuth(): boolean {
  return window.sessionStorage.getItem(AUTH_SESSION_KEY) === "1";
}

const getServerAuthSnapshot = () => false;

/**
 * A password screen, not real auth — the product has no backend/auth system
 * yet (see docs/AUDIT.md #6, docs/ENGINEERING_READINESS.md Level 1). This is
 * a shield against accidental visits, sufficient only while the page is
 * unlinked and disallowed in robots.ts. If a real backend lands, replace
 * this with proper auth or delete the route.
 */
function getExpectedPassword(): string {
  return process.env.NEXT_PUBLIC_DEV_DASHBOARD_PASSWORD ?? "fitloyalty-dev";
}

export function DevDashboardGate({ children }: { children: React.ReactNode }) {
  const unlocked = React.useSyncExternalStore(subscribeToAuth, readAuth, getServerAuthSnapshot);
  const hydrated = React.useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [input, setInput] = React.useState("");
  const [error, setError] = React.useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input === getExpectedPassword()) {
      window.sessionStorage.setItem(AUTH_SESSION_KEY, "1");
      window.dispatchEvent(new CustomEvent(AUTH_CHANGED_EVENT));
      setError(false);
    } else {
      setError(true);
    }
  }

  if (!hydrated) return null;

  if (!unlocked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm rounded-lg border border-border bg-surface-1 p-6 shadow-[var(--shadow-card)]"
        >
          <div className="mb-4 flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-md bg-[var(--accent-subtle)] text-brand">
              <Lock className="size-4" />
            </span>
            <div>
              <p className="text-sm font-semibold">Internal dashboard</p>
              <p className="text-xs text-muted-foreground">Founder-only. Not for demo.</p>
            </div>
          </div>
          <Label htmlFor="dev-dashboard-password">Password</Label>
          <Input
            id="dev-dashboard-password"
            type="password"
            autoFocus
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError(false);
            }}
            className="mt-1.5"
          />
          {error && <p className="mt-2 text-xs text-error">Wrong password.</p>}
          <Button type="submit" className="mt-4 w-full">
            Unlock
          </Button>
        </form>
      </div>
    );
  }

  return <>{children}</>;
}
