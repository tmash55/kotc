"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Trophy, LayoutGrid, Table as TableIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Player = {
  personId: string;
  name: string;
  matchup: string;
  points: number;
  rebounds: number;
  assists: number;
  pra: number;
  gameStatus: string;
  gameDate: string;
};

type ViewMode = "card" | "table";

type KOTCDashboardProps = {
  players: Player[];
  allGamesFinal: boolean;
  lastUpdated: string;
};

type ChangedStats = {
  [key: string]: Set<"points" | "rebounds" | "assists" | "pra" | "gameStatus">;
};

export default function KOTCDashboard({
  players,
  allGamesFinal,
  lastUpdated,
}: KOTCDashboardProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("card");
  const [changedStats, setChangedStats] = useState<ChangedStats>({});
  const prevPlayersRef = useRef<Player[]>([]);

  useEffect(() => {
    const newChangedStats: ChangedStats = {};
    players.forEach((player) => {
      const prevPlayer = prevPlayersRef.current.find(
        (p) => p.personId === player.personId
      );
      if (prevPlayer) {
        const changedFields = new Set<
          "points" | "rebounds" | "assists" | "pra" | "gameStatus"
        >();
        if (prevPlayer.points !== player.points) changedFields.add("points");
        if (prevPlayer.rebounds !== player.rebounds)
          changedFields.add("rebounds");
        if (prevPlayer.assists !== player.assists) changedFields.add("assists");
        if (prevPlayer.pra !== player.pra) changedFields.add("pra");
        if (prevPlayer.gameStatus !== player.gameStatus)
          changedFields.add("gameStatus");
        if (changedFields.size > 0) {
          newChangedStats[player.personId] = changedFields;
        }
      }
    });
    setChangedStats(newChangedStats);
    prevPlayersRef.current = players;

    // Clear highlighting after 1 second
    const timerId = setTimeout(() => {
      setChangedStats({});
    }, 1000);

    return () => clearTimeout(timerId);
  }, [players]);

  const filteredPlayers = players.filter(
    (player) =>
      player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.matchup.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy className="h-5 w-5 text-yellow-500" />;
    if (index === 1) return <Trophy className="h-5 w-5 text-gray-400" />;
    if (index === 2) return <Trophy className="h-5 w-5 text-amber-600" />;
    return null;
  };

  const getStatusBadge = (status: string, playerId: string) => (
    <Badge
      variant="secondary"
      className={`
        ${
          status === "Final" || status === "Final/OT"
            ? "bg-green-100 text-green-800 hover:bg-green-100"
            : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
        }
        ${
          changedStats[playerId]?.has("gameStatus")
            ? "text-green-600 transition-colors duration-300"
            : ""
        }
      `}
    >
      {status}
    </Badge>
  );

  const StatDisplay = ({
    label,
    value,
    playerId,
    statKey,
  }: {
    label: string;
    value: number;
    playerId: string;
    statKey: "points" | "rebounds" | "assists" | "pra";
  }) => (
    <div className="space-y-1">
      <span
        className={`text-lg font-bold ${
          changedStats[playerId]?.has(statKey)
            ? "text-green-600 transition-colors duration-300"
            : ""
        }`}
      >
        {value}
      </span>
      <span className="text-xs text-muted-foreground block">{label}</span>
    </div>
  );

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold">KOTC Tracker</h1>
        <p className="text-muted-foreground">
          King of the Court Tracker for DraftKings Promo
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 max-w-sm">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search players or matchups..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === "card" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("card")}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "table" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("table")}
          >
            <TableIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {!allGamesFinal && (
        <Alert>
          <AlertTitle>Games in Progress</AlertTitle>
          <AlertDescription>
            Some games are still in progress. Rankings may change.
          </AlertDescription>
        </Alert>
      )}

      <div className="text-sm text-muted-foreground mb-4">
        Last updated: {lastUpdated}
      </div>

      {viewMode === "card" ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredPlayers.map((player, index) => (
            <Card key={player.personId} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center justify-center w-10">
                      {getRankIcon(index)}
                    </div>
                    <div>
                      <h2 className="font-semibold text-base">{player.name}</h2>
                      <p className="text-xs text-muted-foreground">
                        {player.matchup}
                      </p>
                    </div>
                  </div>
                  {getStatusBadge(player.gameStatus, player.personId)}
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <StatDisplay
                    label="PRA"
                    value={player.pra}
                    playerId={player.personId}
                    statKey="pra"
                  />
                  <StatDisplay
                    label="PTS"
                    value={player.points}
                    playerId={player.personId}
                    statKey="points"
                  />
                  <StatDisplay
                    label="REB"
                    value={player.rebounds}
                    playerId={player.personId}
                    statKey="rebounds"
                  />
                  <StatDisplay
                    label="AST"
                    value={player.assists}
                    playerId={player.personId}
                    statKey="assists"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Rank</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Matchup</TableHead>
              <TableHead className="text-right">PRA</TableHead>
              <TableHead className="text-right">PTS</TableHead>
              <TableHead className="text-right">REB</TableHead>
              <TableHead className="text-right">AST</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPlayers.map((player, index) => (
              <TableRow key={player.personId}>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-2">
                    {getRankIcon(index)}
                    <span>{index + 1}</span>
                  </div>
                </TableCell>
                <TableCell>{player.name}</TableCell>
                <TableCell>{player.matchup}</TableCell>
                <TableCell
                  className={`text-right font-bold ${
                    changedStats[player.personId]?.has("pra")
                      ? "text-green-600 transition-colors duration-300"
                      : ""
                  }`}
                >
                  {player.pra}
                </TableCell>
                <TableCell
                  className={`text-right ${
                    changedStats[player.personId]?.has("points")
                      ? "text-green-600 transition-colors duration-300"
                      : ""
                  }`}
                >
                  {player.points}
                </TableCell>
                <TableCell
                  className={`text-right ${
                    changedStats[player.personId]?.has("rebounds")
                      ? "text-green-600 transition-colors duration-300"
                      : ""
                  }`}
                >
                  {player.rebounds}
                </TableCell>
                <TableCell
                  className={`text-right ${
                    changedStats[player.personId]?.has("assists")
                      ? "text-green-600 transition-colors duration-300"
                      : ""
                  }`}
                >
                  {player.assists}
                </TableCell>
                <TableCell className="text-right">
                  {getStatusBadge(player.gameStatus, player.personId)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
