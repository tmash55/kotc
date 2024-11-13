import AllPlayersTable from "@/components/kotc/AllPlayersTable";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Player = {
  personId: string;
  name: string;
  matchup: string;
  points: number;
  rebounds: number;
  assists: number;
  pra: number;
  gameStatus: string;
};

async function getAllPlayers(): Promise<Player[]> {
  const res = await fetch("http://localhost:3000/api/allPlayers", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch players");
  }
  return res.json();
}

export default async function AllPlayersPage() {
  const players = await getAllPlayers();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">NBA PRA Leaders</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>DraftKings Promo Alert!</CardTitle>
          <CardDescription>
            Bet on a player and if they have the highest PRA (Points + Rebounds
            + Assists) for the day, you get free money!
          </CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Player Stats</CardTitle>
          <CardDescription>
            Search and sort through today&apos;s NBA player statistics.
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  );
}
