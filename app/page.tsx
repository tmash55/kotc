"use client";

import { useState, useEffect } from "react";
import KOTCDashboard from "@/components/kotc/kotc-dashboard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Home() {
  const [players, setPlayers] = useState([]);
  const [allGamesFinal, setAllGamesFinal] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("");
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/allPlayers");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPlayers(data.players);
      setAllGamesFinal(data.allGamesFinal);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (e) {
      console.error("Fetching error:", e);
      setError(e.message);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch immediately on mount

    const intervalId = setInterval(fetchData, 3000);

    return () => clearInterval(intervalId);
  }, []);

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

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-primary mb-4 tracking-tight">
          KOTC Tracker
        </h1>
        <p className="text-xl text-muted-foreground">
          King of the Court Tracker for DraftKings Promo
        </p>
      </header>
      <main className="space-y-8">
        <div className="container mx-auto py-10">
          <KOTCDashboard
            players={players}
            allGamesFinal={allGamesFinal}
            lastUpdated={lastUpdated}
          />
        </div>
      </main>
    </div>
  );
}
