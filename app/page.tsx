"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useSWR from "swr";
import KOTCDashboard from "@/components/kotc/kotc-dashboard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import ScheduledGames from "@/components/kotc/ScheduledGames";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DraftKingsPRA from "@/components/kotc/DraftKingsPRA";
import { WelcomeModal } from "@/components/WelcomeModal";
import RedirectBanner from "@/components/RedirectBanner";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const [activeTab, setActiveTab] = useState("odds");
  const [lastUpdated, setLastUpdated] = useState(
    new Date().toLocaleTimeString()
  );
  const isInitialMount = useRef(true);

  const updateLastUpdated = useCallback(() => {
    setLastUpdated(new Date().toLocaleTimeString());
  }, []);

  const { data, error, isValidating } = useSWR("/api/allPlayers", fetcher, {
    refreshInterval: 20000,
    revalidateOnFocus: false,
    dedupingInterval: 10000,
    onSuccess: updateLastUpdated,
  });

  const players = data?.players || [];
  const games = data?.games || [];
  const allGamesFinal = data?.allGamesFinal || false;
  const gamesScheduled = data?.gamesScheduled || false;

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    }
  }, []);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load player data: {error.message}. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 px-4 py-8">
      <div className="container mx-auto">
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-10 md:py-16 lg:py-24 xl:py-24"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none ">
                  KOTC Tracker
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  King of the Court Tracker for DraftKings Promo
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        <RedirectBanner />
        
        
      </div>
    </div>
  );
}
