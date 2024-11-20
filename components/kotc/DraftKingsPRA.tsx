"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RefreshCw } from "lucide-react";

interface Player {
  id: string;
  name: string;
  position: string;
  team: {
    id: string;
    name: string;
    abbreviation: string;
  };
}

interface Odd {
  id: string;
  market: string;
  name: string;
  price: string;
  points: number;
  selection: string;
  players: Player[];
}

interface Game {
  id: string;
  teams: {
    away: { name: string; abbreviation: string };
    home: { name: string; abbreviation: string };
  };
  start: string;
  sportsbooks: Array<{
    id: string;
    name: string;
    odds: Odd[];
  }>;
}

interface ApiResponse {
  games: Game[];
}

interface PlayerPRA {
  id: string;
  name: string;
  gameName: string;
  gameTime: string;
  points: number;
  price: string;
}

export default function DraftKingsPRA() {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  //const [sortBy, setSortBy] = useState<'pra' | 'matchup'>('pra')

  const fetchPRAData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/oddsblaze");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data: ApiResponse = await response.json();
      setGames(data.games);
    } catch (err) {
      setError("Error fetching PRA data. Please try again later.");
      console.error("Error fetching PRA data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPRAData();
    const intervalId = setInterval(fetchPRAData, 300000); // Refresh every 5 minutes
    return () => clearInterval(intervalId);
  }, []);

  const calculateImpliedProbability = (americanOdds: string) => {
    const odds = parseInt(americanOdds);
    if (odds > 0) {
      return 100 / (odds + 100);
    } else {
      return -odds / (-odds + 100);
    }
  };

  const playerPRAData = useMemo(() => {
    return games.flatMap((game) =>
      game.sportsbooks[0]?.odds
        .filter(
          (odd) =>
            odd.market === "Player Points + Rebounds + Assists" &&
            odd.selection === "Over"
        )
        .map((odd) => ({
          id: odd.id,
          name: odd.players[0]?.name || "Unknown Player",
          gameName: `${game.teams.away.name} @ ${game.teams.home.name}`,
          gameTime: game.start,
          points: odd.points,
          price: odd.price,
        }))
    );
  }, [games]);

  const sortedPlayerPRAData = useMemo(() => {
    return [...playerPRAData].sort((a, b) => b.points - a.points);
  }, [playerPRAData]);

  return (
    <div className="w-full">
      {/* Remove this entire block */}
      {/* <div className="flex justify-end mb-4">
        <Select
          value={sortBy}
          onValueChange={(value: "pra" | "matchup") => setSortBy(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pra">Highest to Lowest PRA</SelectItem>
            <SelectItem value="matchup">By Matchup</SelectItem>
          </SelectContent>
        </Select>
      </div> */}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Player</TableHead>
              <TableHead>PRA Over/Under</TableHead>
              <TableHead>Odds</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedPlayerPRAData.map((player, index) => (
              <TableRow
                key={player.id}
                className={index % 2 === 0 ? "bg-background" : "bg-muted/50"}
              >
                <TableCell>{player.name}</TableCell>
                <TableCell>{player.points}</TableCell>
                <TableCell>{player.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
