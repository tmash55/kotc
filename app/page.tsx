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
    <div className="container mx-auto px-4">
      <section className="py-12 md:py-24 lg:py-32 xl:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                KOTC Tracker
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                King of the Court Tracker for DraftKings Promo
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="mt-4">
        <KOTCDashboard
          players={players}
          allGamesFinal={allGamesFinal}
          lastUpdated={lastUpdated}
        />
      </div>
    </div>
  );
}
