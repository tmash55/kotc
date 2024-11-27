"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Star } from "lucide-react";

export function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setIsOpen(true);
      localStorage.setItem("hasVisited", "true");
    }
  }, []);

  const clearLocalStorage = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto w-[95vw] p-6">
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl">
              Welcome to KOTC Tracker!
            </DialogTitle>
            <DialogDescription className="text-base">
              Your go-to platform for tracking King of the Court on DraftKings.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <p className="text-base">Here's how to use our key features:</p>
            <ul className="space-y-4 list-none">
              <li className="flex gap-3">
                <span className="text-base">•</span>
                <span>View live leaderboards once games start</span>
              </li>
              <li className="flex gap-3">
                <span className="text-base">•</span>
                <span>Check today's NBA schedule</span>
              </li>
              <li className="flex gap-3">
                <span className="text-base">•</span>
                <span>See DraftKings PRA (Points, Rebounds, Assists) odds</span>
              </li>
              <li className="flex gap-3">
                <span className="text-base">•</span>
                <span>Data auto-refreshes every 20 seconds</span>
              </li>
              <li className="flex gap-3">
                <span className="text-base">•</span>
                <div className="flex items-center gap-1">
                  <span>
                    Track your favorite players by selecting the star icon
                  </span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-base">•</span>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-500 flex-shrink-0" />
                  <span>
                    Green circle indicates the player is currently on the court
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <DialogFooter>
            <Button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full"
            >
              Got it, thanks!
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Test button - remove in production */}
    </>
  );
}
