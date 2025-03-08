"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import DraftKingsPRA from "@/components/kotc/DraftKingsPRA";

export default function OddsPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [currentDate, setCurrentDate] = useState("");

  const refreshData = async () => {
    setIsRefreshing(true);
    try {
      setRefreshKey((prevKey) => prevKey + 1);
      updateDateTime();
    } finally {
      setIsRefreshing(false);
    }
  };

  const updateDateTime = () => {
    const now = new Date();
    setCurrentDate(
      now.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
    setLastUpdated(now.toLocaleString());
  };

  useEffect(() => {
    updateDateTime();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-0">
          NBA Odds for {currentDate}
        </h1>
        <Button
          onClick={refreshData}
          disabled={isRefreshing}
          className="w-full sm:w-auto"
        >
          <RefreshCw
            className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
          />
          {isRefreshing ? "Refreshing..." : "Refresh"}
        </Button>
      </div>
      <motion.div
        key={refreshKey}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <DraftKingsPRA />
      </motion.div>
      {lastUpdated && (
        <p className="text-sm text-muted-foreground mt-4 text-center sm:text-left">
          Last updated: {lastUpdated}
        </p>
      )}
    </div>
  );
}
