"use client";

import { useState, useEffect, useRef } from "react";
import {
  Search,
  Trophy,
  LayoutGrid,
  TableIcon,
  RefreshCcw,
} from "lucide-react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Player = {
  personId: string;
  name: string;
  matchup: string;
  points: number;
  rebounds: number;
  assists: number;
  pra: number;
  gameStatus: string;
  gameClock: string;
  period: number;
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
  const [viewMode, setViewMode] = useState<ViewMode>("table");
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

    if (Object.keys(newChangedStats).length > 0) {
      setChangedStats(newChangedStats);
      const timerId = setTimeout(() => {
        setChangedStats({});
      }, 2000);
      return () => clearTimeout(timerId);
    }
  }, [players]);

  const filteredPlayers = players.filter(
    (player) =>
      player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.matchup.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy className="h-5 w-5 text-yellow-500" />;
    if (index === 1)
      return <Trophy className="h-5 w-5 text-gray-400 dark:text-gray-500" />;
    if (index === 2) return <Trophy className="h-5 w-5 text-amber-600" />;
    return null;
  };

  const getStatusBadge = (player: Player) => {
    let displayStatus = player.gameStatus;

    // Format game clock if it exists and game is in progress
    if (player.gameClock && player.period) {
      // Remove the "PT" prefix and ".00S" suffix and convert to minutes:seconds
      const clockMatch = player.gameClock.match(/PT(\d+)M(\d+)\.00S/);
      if (clockMatch) {
        const [_, minutes, seconds] = clockMatch;
        displayStatus = `${player.period}Q ${minutes}:${seconds.padStart(
          2,
          "0"
        )}`;
      }
    }

    return (
      <Badge
        variant={
          player.gameStatus === "Final" || player.gameStatus === "Final/OT"
            ? "secondary"
            : "outline"
        }
        className={`
          ${
            player.gameStatus === "Final" || player.gameStatus === "Final/OT"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
          }
          ${
            changedStats[player.personId]?.has("gameStatus")
              ? "animate-pulse"
              : ""
          }
        `}
      >
        {displayStatus}
      </Badge>
    );
  };

  const getCardClassName = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-br from-yellow-300 to-yellow-100 dark:from-yellow-600 dark:to-yellow-900 shadow-xl shadow-yellow-200/50 dark:shadow-yellow-900/50 border-yellow-400 dark:border-yellow-700";
      case 2:
        return "bg-gradient-to-br from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-800 shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 border-gray-300 dark:border-gray-600";
      case 3:
        return "bg-gradient-to-br from-amber-200 to-amber-100 dark:from-amber-700 dark:to-amber-800 shadow-lg shadow-amber-200/50 dark:shadow-amber-900/50 border-amber-300 dark:border-amber-600";
      default:
        return "bg-white dark:bg-gray-950 hover:shadow-md dark:shadow-none border-gray-200 dark:border-gray-800";
    }
  };

  const getTrophyIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <Trophy className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
        );
      case 2:
        return <Trophy className="h-6 w-6 text-gray-500 dark:text-gray-400" />;
      case 3:
        return (
          <Trophy className="h-6 w-6 text-amber-600 dark:text-amber-500" />
        );
      default:
        return null;
    }
  };
  const getRowClassName = (index: number) => {
    switch (index) {
      case 0:
        return "bg-yellow-100 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100";
      case 1:
        return "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100";
      case 2:
        return "bg-amber-100 dark:bg-amber-900 text-amber-900 dark:text-amber-100";
      default:
        return "bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-900";
    }
  };
  const getTableRowClassName = (rank: number) => {
    const baseClasses = "transition-colors duration-200";

    switch (rank) {
      case 1:
        return `${baseClasses} bg-yellow-50 dark:bg-yellow-900/40 hover:bg-yellow-100/80 dark:hover:bg-yellow-800/50`;
      case 2:
        return `${baseClasses} bg-gray-50 dark:bg-gray-400/20 hover:bg-gray-100/80 dark:hover:bg-gray-400/30`;
      case 3:
        return `${baseClasses} bg-amber-50 dark:bg-amber-900/40 hover:bg-amber-100/80 dark:hover:bg-amber-800/50`;
      default:
        return `${baseClasses} bg-white dark:bg-gray-950 hover:bg-gray-100/80 dark:hover:bg-gray-900`;
    }
  };

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
            ? "text-green-600 dark:text-green-400 animate-pulse"
            : ""
        }`}
      >
        {value}
      </span>
      <span className="text-xs text-muted-foreground block">{label}</span>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div className="relative max-w-sm w-full">
          <Input
            placeholder="Search player"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full"
          />
          <Search className="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
        <div className="flex items-center space-x-4">
          <TooltipProvider>
            <div className="flex items-center space-x-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={viewMode === "card" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("card")}
                  >
                    <LayoutGrid className="h-4 w-4" />
                    <span className="sr-only">Card view</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Card view</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={viewMode === "table" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("table")}
                  >
                    <TableIcon className="h-4 w-4" />
                    <span className="sr-only">Table view</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Table view</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
          <div className="flex items-center text-sm text-muted-foreground">
            <RefreshCcw className="h-4 w-4 mr-2 animate-spin" />
            Last updated: {lastUpdated}
          </div>
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

      {viewMode === "card" ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredPlayers.map((player) => {
            const rank =
              players.findIndex((p) => p.personId === player.personId) + 1;
            return (
              <Card
                key={player.personId}
                className={`overflow-hidden transition-all duration-300 ${getCardClassName(
                  rank
                )}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      <div className="mt-1">{getTrophyIcon(rank)}</div>
                      <div>
                        <h2 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                          {player.name}
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {player.matchup}
                        </p>
                      </div>
                    </div>
                    {getStatusBadge(player)}
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center">
                      <div
                        className={`text-2xl font-bold mb-1 ${
                          changedStats[player.personId]?.has("pra")
                            ? "text-green-600 dark:text-green-400 animate-pulse"
                            : "text-gray-900 dark:text-gray-100"
                        }`}
                      >
                        {player.pra}
                      </div>
                      <div className="text-xs font-medium text-gray-600 dark:text-gray-400">
                        PRA
                      </div>
                    </div>
                    <div className="text-center">
                      <div
                        className={`text-2xl font-bold mb-1 ${
                          changedStats[player.personId]?.has("points")
                            ? "text-green-600 dark:text-green-400 animate-pulse"
                            : "text-gray-900 dark:text-gray-100"
                        }`}
                      >
                        {player.points}
                      </div>
                      <div className="text-xs font-medium text-gray-600 dark:text-gray-400">
                        PTS
                      </div>
                    </div>
                    <div className="text-center">
                      <div
                        className={`text-2xl font-bold mb-1 ${
                          changedStats[player.personId]?.has("rebounds")
                            ? "text-green-600 dark:text-green-400 animate-pulse"
                            : "text-gray-900 dark:text-gray-100"
                        }`}
                      >
                        {player.rebounds}
                      </div>
                      <div className="text-xs font-medium text-gray-600 dark:text-gray-400">
                        REB
                      </div>
                    </div>
                    <div className="text-center">
                      <div
                        className={`text-2xl font-bold mb-1 ${
                          changedStats[player.personId]?.has("assists")
                            ? "text-green-600 dark:text-green-400 animate-pulse"
                            : "text-gray-900 dark:text-gray-100"
                        }`}
                      >
                        {player.assists}
                      </div>
                      <div className="text-xs font-medium text-gray-600 dark:text-gray-400">
                        AST
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="rounded-md border dark:border-gray-800 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800">
                <TableHead className="text-gray-900 dark:text-gray-100 font-semibold">
                  Rank
                </TableHead>
                <TableHead className="text-gray-900 dark:text-gray-100 font-semibold">
                  Name
                </TableHead>
                <TableHead className="text-gray-900 dark:text-gray-100 font-semibold">
                  Matchup
                </TableHead>
                <TableHead className="text-right text-gray-900 dark:text-gray-100 font-semibold">
                  PRA
                </TableHead>
                <TableHead className="text-right text-gray-900 dark:text-gray-100 font-semibold">
                  PTS
                </TableHead>
                <TableHead className="text-right text-gray-900 dark:text-gray-100 font-semibold">
                  REB
                </TableHead>
                <TableHead className="text-right text-gray-900 dark:text-gray-100 font-semibold">
                  AST
                </TableHead>
                <TableHead className="text-right text-gray-900 dark:text-gray-100 font-semibold">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPlayers.map((player) => {
                const rank =
                  players.findIndex((p) => p.personId === player.personId) + 1;
                return (
                  <TableRow
                    key={player.personId}
                    className={getTableRowClassName(rank)}
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-2">
                        {getTrophyIcon(rank)}
                        <span>{rank}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">
                      {player.name}
                    </TableCell>
                    <TableCell>{player.matchup}</TableCell>
                    <TableCell
                      className={`text-right font-bold ${
                        changedStats[player.personId]?.has("pra")
                          ? "text-green-600 dark:text-green-400 animate-pulse"
                          : ""
                      }`}
                    >
                      {player.pra}
                    </TableCell>
                    <TableCell
                      className={`text-right ${
                        changedStats[player.personId]?.has("points")
                          ? "text-green-600 dark:text-green-400 animate-pulse"
                          : ""
                      }`}
                    >
                      {player.points}
                    </TableCell>
                    <TableCell
                      className={`text-right ${
                        changedStats[player.personId]?.has("rebounds")
                          ? "text-green-600 dark:text-green-400 animate-pulse"
                          : ""
                      }`}
                    >
                      {player.rebounds}
                    </TableCell>
                    <TableCell
                      className={`text-right ${
                        changedStats[player.personId]?.has("assists")
                          ? "text-green-600 dark:text-green-400 animate-pulse"
                          : ""
                      }`}
                    >
                      {player.assists}
                    </TableCell>
                    <TableCell className="text-right">
                      {getStatusBadge(player)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
