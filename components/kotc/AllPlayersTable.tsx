"use client";

import { useState, useMemo } from "react";
import { ArrowUpIcon, ArrowDownIcon, Search, Trophy } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

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

type AllPlayersTableProps = {
  players: Player[];
};

export default function AllPlayersTable({ players }: AllPlayersTableProps) {
  const [sortColumn, setSortColumn] = useState<keyof Player>("pra");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [searchTerm, setSearchTerm] = useState("");

  const sortedAndFilteredPlayers = useMemo(() => {
    return players
      .filter(
        (player) =>
          player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          player.matchup.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (a[sortColumn] < b[sortColumn])
          return sortDirection === "asc" ? -1 : 1;
        if (a[sortColumn] > b[sortColumn])
          return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
  }, [players, sortColumn, sortDirection, searchTerm]);

  const handleSort = (column: keyof Player) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("desc");
    }
  };

  const getStatusColor = (status: string) => {
    if (status === "Final") return "bg-green-100 text-green-800";
    if (status === "Final/OT") return "bg-green-100 text-green-800";
    if (status.includes("Q")) return "bg-yellow-100 text-yellow-800";
    return "bg-gray-100 text-gray-800";
  };

  const getTopThreeStyle = (index: number) => {
    switch (index) {
      case 0:
        return "bg-yellow-100 border-l-4 border-yellow-400";
      case 1:
        return "bg-gray-100 border-l-4 border-gray-400";
      case 2:
        return "bg-orange-100 border-l-4 border-orange-400";
      default:
        return "";
    }
  };

  const getTopThreeBadge = (index: number) => {
    switch (index) {
      case 0:
        return <Badge className="bg-yellow-400 text-yellow-900">1st</Badge>;
      case 1:
        return <Badge className="bg-gray-400 text-gray-900">2nd</Badge>;
      case 2:
        return <Badge className="bg-orange-400 text-orange-900">3rd</Badge>;
      default:
        return null;
    }
  };

  // Get the game date from the first player (all games are from the same day)
  const gameDate = players.length > 0 ? players[0].gameDate : "";

  // Function to format the date correctly
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC", // Ensure consistent timezone handling
    });
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search players or matchups..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8"
        />
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">
          Games for {formatDate(gameDate)}
        </h2>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Rank</TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  Name{" "}
                  {sortColumn === "name" &&
                    (sortDirection === "asc" ? (
                      <ArrowUpIcon className="inline w-4 h-4" />
                    ) : (
                      <ArrowDownIcon className="inline w-4 h-4" />
                    ))}
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("pra")}
                >
                  PRA{" "}
                  {sortColumn === "pra" &&
                    (sortDirection === "asc" ? (
                      <ArrowUpIcon className="inline w-4 h-4" />
                    ) : (
                      <ArrowDownIcon className="inline w-4 h-4" />
                    ))}
                </TableHead>
                <TableHead>P</TableHead>
                <TableHead>R</TableHead>
                <TableHead>A</TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("matchup")}
                >
                  Matchup{" "}
                  {sortColumn === "matchup" &&
                    (sortDirection === "asc" ? (
                      <ArrowUpIcon className="inline w-4 h-4" />
                    ) : (
                      <ArrowDownIcon className="inline w-4 h-4" />
                    ))}
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("gameStatus")}
                >
                  Status{" "}
                  {sortColumn === "gameStatus" &&
                    (sortDirection === "asc" ? (
                      <ArrowUpIcon className="inline w-4 h-4" />
                    ) : (
                      <ArrowDownIcon className="inline w-4 h-4" />
                    ))}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedAndFilteredPlayers.map((player, index) => (
                <TableRow
                  key={player.personId}
                  className={`${getTopThreeStyle(index)}`}
                >
                  <TableCell className="font-medium">
                    {index < 3 ? (
                      <div className="flex items-center space-x-2">
                        <Trophy
                          className={`w-4 h-4 ${
                            index === 0
                              ? "text-yellow-500"
                              : index === 1
                              ? "text-gray-500"
                              : "text-orange-500"
                          }`}
                        />
                        <span>{index + 1}</span>
                      </div>
                    ) : (
                      index + 1
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span>{player.name}</span>
                      {getTopThreeBadge(index)}
                    </div>
                  </TableCell>
                  <TableCell className="font-bold text-lg">
                    {player.pra}
                  </TableCell>
                  <TableCell>{player.points}</TableCell>
                  <TableCell>{player.rebounds}</TableCell>
                  <TableCell>{player.assists}</TableCell>
                  <TableCell>{player.matchup}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                        player.gameStatus
                      )}`}
                    >
                      {player.gameStatus}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
