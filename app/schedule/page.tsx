"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ScheduledGames from "@/components/kotc/ScheduledGames";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export default function SchedulePage() {
  const [games, setGames] = useState([]);
  const [lastUpdated, setLastUpdated] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/allPlayers");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (data.gamesScheduled && data.games) {
        setGames(data.games);
      } else {
        setGames([]);
      }

      setLastUpdated(new Date().toLocaleTimeString());
    } catch (e) {
      console.error("Fetching error:", e);
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 300000); // Refresh every 5 minutes
    return () => clearInterval(intervalId);
  }, []);

  const handleManualRefresh = () => {
    fetchData();
  };

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load game data: {error}. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-0">
          Today&apos;s NBA Schedule
        </h1>
      </div>
      {isLoading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex justify-center items-center h-64"
        >
          <div className="animate-spin rounded-full h-16 w-16 sm:h-32 sm:w-32 border-t-2 border-b-2 border-primary"></div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ScheduledGames games={games} />
        </motion.div>
      )}
      {lastUpdated && (
        <p className="text-sm text-muted-foreground mt-4 text-center sm:text-left">
          Last updated: {lastUpdated}
        </p>
      )}
    </div>
  );
}
