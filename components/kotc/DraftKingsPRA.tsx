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

import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

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
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchPRAData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/oddsblaze", {
        cache: "no-store",
        headers: {
          Pragma: "no-cache",
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data: ApiResponse = await response.json();
      setGames(data.games);
    } catch (err) {
      console.error("Error fetching PRA data:", err);
      toast({
        title: "Error",
        description: "Failed to load odds data. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPRAData();
  }, []);

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
          gameTime: new Date(game.start).toLocaleString(),
          points: odd.points,
          price: odd.price,
        }))
    );
  }, [games]);

  const sortedPlayerPRAData = useMemo(() => {
    return [...playerPRAData].sort((a, b) => b.points - a.points);
  }, [playerPRAData]);

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[...Array(10)].map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Player</TableHead>
              <TableHead>Game</TableHead>
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
                <TableCell>{player.gameName}</TableCell>

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
