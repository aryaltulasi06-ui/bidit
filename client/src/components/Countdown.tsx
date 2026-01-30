import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isTimeUp: boolean;
}

interface CountdownProps {
  onTimeUp: () => void;
}

export function Countdown({ onTimeUp }: CountdownProps) {
  const [countdown, setCountdown] = useState<CountdownState>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isTimeUp: false,
  });
  const [showDevPanel, setShowDevPanel] = useState(false);
  const [devPassword, setDevPassword] = useState("");
  const [devUnlocked, setDevUnlocked] = useState(
    () => sessionStorage.getItem("devUnlocked") === "true"
  );
  const [passwordError, setPasswordError] = useState(false);
  const [bypassTriggered, setBypassTriggered] = useState(false);

  useEffect(() => {
    const updateCountdown = () => {
      // Target: 12:00 AM UK time on January 31st, 2026 (UTC midnight)
      const target = new Date("2026-01-31T00:00:00Z");
      const now = new Date();

      const difference = target.getTime() - now.getTime();

      if (difference <= 0) {
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isTimeUp: true,
        });
        onTimeUp();
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds, isTimeUp: false });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [onTimeUp]);

  const handleDevPassword = () => {
    if (devPassword === "iloveyousana") {
      setDevUnlocked(true);
      sessionStorage.setItem("devUnlocked", "true");
      setPasswordError(false);
      setShowDevPanel(false);
      setDevPassword("");
      // Automatically go to main page
      setBypassTriggered(true);
      setTimeout(() => onTimeUp(), 100);
    } else {
      setPasswordError(true);
      setDevPassword("");
    }
  };

  if (bypassTriggered) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 flex items-center justify-center z-50">
      <div className="text-center space-y-8 px-4">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-serif text-primary italic">
            Counting Down...
          </h1>
          <p className="text-lg text-muted-foreground">
            Until your special day at midnight UK time
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 justify-center">
          {[
            { label: "Days", value: countdown.days },
            { label: "Hours", value: countdown.hours },
            { label: "Minutes", value: countdown.minutes },
            { label: "Seconds", value: countdown.seconds },
          ].map((item) => (
            <div key={item.label} className="space-y-2">
              <div className="bg-white/80 backdrop-blur border-2 border-primary/20 rounded-lg p-4 md:p-6 shadow-sm">
                <div className="text-3xl md:text-5xl font-bold text-primary">
                  {String(item.value).padStart(2, "0")}
                </div>
              </div>
              <p className="text-sm md:text-base text-muted-foreground font-medium">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* Developer Section */}
        <div className="mt-12 pt-8 border-t border-primary/10">
          {!showDevPanel ? (
            <button
              onClick={() => setShowDevPanel(true)}
              className="text-xs text-muted-foreground hover:text-primary/50 transition-colors"
            >
              Dev Mode
            </button>
          ) : (
            <div className="space-y-3 bg-white/50 backdrop-blur border border-primary/10 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Enter password:</p>
              <div className="flex gap-2">
                <Input
                  type="password"
                  placeholder="Password"
                  value={devPassword}
                  onChange={(e) => {
                    setDevPassword(e.target.value);
                    setPasswordError(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleDevPassword();
                    }
                  }}
                  className={
                    passwordError ? "border-red-500 focus:border-red-500" : ""
                  }
                />
                <Button
                  onClick={handleDevPassword}
                  size="sm"
                  className="bg-primary hover:bg-primary/90"
                >
                  Unlock
                </Button>
              </div>
              {passwordError && (
                <p className="text-xs text-red-500">Incorrect password</p>
              )}
            </div>
          )}


        </div>
      </div>
    </div>
  );
}
