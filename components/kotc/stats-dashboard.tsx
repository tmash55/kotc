"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Crown, History, Medal, Search, Trophy } from "lucide-react";

export default function Component() {
  const [searchQuery, setSearchQuery] = useState("");

  const players = [
    {
      id: 1,
      name: "Karl-Anthony Towns",
      rank: 1,
      pra: 59,
      points: 44,
      rebounds: 13,
      assists: 2,
      matchup: "NYK @ MIA",
      status: "Final",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 2,
      name: "Trae Young",
      rank: 2,
      pra: 54,
      points: 35,
      rebounds: 4,
      assists: 15,
      matchup: "ATL @ WAS",
      status: "Final",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    // Add more players as needed
  ];

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-muted">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="flex items-center space-x-2 font-bold">
            <Crown className="h-6 w-6" />
            <span>KOTC Tracker</span>
          </div>
          <nav className="flex items-center space-x-6 ml-6">
            <Button variant="ghost" className="flex items-center space-x-2">
              <Activity className="h-4 w-4" />
              <span>Today's Games</span>
            </Button>
            <Button variant="ghost" className="flex items-center space-x-2">
              <History className="h-4 w-4" />
              <span>Historical Data</span>
            </Button>
            <Button variant="ghost" className="flex items-center space-x-2">
              <Trophy className="h-4 w-4" />
              <span>Team Winners</span>
            </Button>
          </nav>
        </div>
      </header>

      <main className="container flex-1 py-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">NBA PRA Leaders</CardTitle>
                <CardDescription>
                  Points + Rebounds + Assists Leaderboard
                </CardDescription>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search players..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Tabs defaultValue="all" className="w-[300px]">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="finished">Finished</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-4">
                {filteredPlayers.map((player) => (
                  <Card
                    key={player.id}
                    className="p-4 transition-all hover:bg-muted/50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex h-8 w-8 items-center justify-center">
                        {player.rank <= 3 ? (
                          <Medal
                            className={`h-6 w-6 ${
                              player.rank === 1
                                ? "text-yellow-500"
                                : player.rank === 2
                                ? "text-gray-400"
                                : "text-amber-600"
                            }`}
                          />
                        ) : (
                          <span className="text-lg font-semibold text-muted-foreground">
                            {player.rank}
                          </span>
                        )}
                      </div>
                      <img
                        src={player.avatar}
                        alt=""
                        className="h-10 w-10 rounded-full bg-muted"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">{player.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {player.matchup}
                            </p>
                          </div>
                          <Badge
                            variant={
                              player.status === "Final"
                                ? "secondary"
                                : "default"
                            }
                          >
                            {player.status}
                          </Badge>
                        </div>
                        <div className="mt-2 flex space-x-4 text-sm">
                          <div className="flex items-center space-x-1">
                            <span className="font-medium">{player.pra}</span>
                            <span className="text-muted-foreground">PRA</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="font-medium">{player.points}</span>
                            <span className="text-muted-foreground">PTS</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="font-medium">
                              {player.rebounds}
                            </span>
                            <span className="text-muted-foreground">REB</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="font-medium">
                              {player.assists}
                            </span>
                            <span className="text-muted-foreground">AST</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
