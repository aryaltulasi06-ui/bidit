import { Switch, Route } from "wouter";
import { useState, useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { Countdown } from "@/components/Countdown";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const getIsBeforeCountdown = () => {
    // Check if dev mode was unlocked
    if (sessionStorage.getItem("devUnlocked") === "true") {
      return false;
    }

    // Allow overriding "now" for local testing via:
    // - query param: ?now=2026-01-31T00:37:00+05:45
    // - Vite env var: VITE_TEST_NOW (ISO string)
    const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
    let now: Date | null = null;

    if (params && params.get("now")) {
      const v = params.get("now")!;
      const parsed = new Date(v);
      if (!isNaN(parsed.getTime())) now = parsed;
    }

    if (!now && import.meta.env.VITE_TEST_NOW) {
      const parsed = new Date(import.meta.env.VITE_TEST_NOW as string);
      if (!isNaN(parsed.getTime())) now = parsed;
    }

    if (!now) now = new Date();

    // Create target date: Jan 31, 2026 at 00:00:00 UTC
    const target = new Date("2026-01-31T00:00:00Z"); // UTC midnight
    return now.getTime() < target.getTime();
  };

  const [showCountdown, setShowCountdown] = useState(getIsBeforeCountdown());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        {showCountdown ? (
          <Countdown onTimeUp={() => setShowCountdown(false)} />
        ) : (
          <Router />
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
