"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import KOTCDashboard from "@/components/kotc/kotc-dashboard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import ScheduledGames from "@/components/kotc/ScheduledGames";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DraftKingsPRA from "@/components/kotc/DraftKingsPRA";

export default function Home() {
  const [players, setPlayers] = useState([]);
  const [games, setGames] = useState([]);
  const [allGamesFinal, setAllGamesFinal] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("");
  const [error, setError] = useState(null);
  const [gamesScheduled, setGamesScheduled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isManualRefresh, setIsManualRefresh] = useState(true);
  const [activeTab, setActiveTab] = useState("odds");
  const isInitialMount = useRef(true);

  const fetchData = async (manual = false) => {
    if (manual) {
      setIsLoading(true);
      setIsManualRefresh(true);
    }
    try {
      const response = await fetch("/api/allPlayers");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (data.gamesScheduled && (!data.players || data.players.length === 0)) {
        setGamesScheduled(true);
        setGames(data.games);
      } else {
        setGamesScheduled(false);
        setPlayers(data.players);
        setAllGamesFinal(data.allGamesFinal);
      }

      setLastUpdated(new Date().toLocaleTimeString());
    } catch (e) {
      console.error("Fetching error:", e);
      setError(e.message);
    } finally {
      if (manual) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (isInitialMount.current) {
      fetchData(true);
      isInitialMount.current = false;
    } else if (!gamesScheduled) {
      const intervalId = setInterval(() => fetchData(false), 15000);
      return () => clearInterval(intervalId);
    }
  }, [gamesScheduled]);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load player data: {error}. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const handleManualRefresh = () => {
    fetchData(true);
  };

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
        <AnimatePresence mode="wait">
          {isLoading && isManualRefresh ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center h-64"
            >
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
            </motion.div>
          ) : gamesScheduled ? (
            <motion.div
              key="scheduled"
              initial={isManualRefresh ? { opacity: 0, x: 20 } : false}
              animate={isManualRefresh ? { opacity: 1, x: 0 } : false}
              transition={{ duration: 0.3 }}
            >
              <p className="text-lg text-muted-foreground mb-4">
                Once games start, this page will display the live leaderboard.
                Who will be the king today?
              </p>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="schedule">
                    Today&apos;s Schedule
                  </TabsTrigger>
                  <TabsTrigger value="odds">DraftKings PRA</TabsTrigger>
                </TabsList>
                <TabsContent value="schedule">
                  <h2 className="text-2xl font-bold my-4">
                    Today&apos;s NBA Schedule
                  </h2>
                  <ScheduledGames games={games} />
                </TabsContent>
                <TabsContent value="odds">
                  <h2 className="text-2xl font-bold my-4">
                    DraftKings PRA Odds
                  </h2>
                  <DraftKingsPRA />
                </TabsContent>
              </Tabs>
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={isManualRefresh ? { opacity: 0, x: 20 } : false}
              animate={isManualRefresh ? { opacity: 1, x: 0 } : false}
              transition={{ duration: 0.3 }}
            >
              <KOTCDashboard
                players={players}
                allGamesFinal={allGamesFinal}
                lastUpdated={lastUpdated}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <motion.div
        className="fixed bottom-8 right-8"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <Button
          size="lg"
          className="rounded-full shadow-lg"
          onClick={handleManualRefresh}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </motion.div>
    </div>
  );
}
