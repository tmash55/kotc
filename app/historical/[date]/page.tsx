// app/historical/[date]/page.tsx
import { format, parse } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import HistoricalPlayersTable from "@/components/kotc/HistoricalPlayersTable";

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

async function getPlayersByDate(date: string): Promise<Player[]> {
  // Fetch games for the selected date
  const gamesRes = await fetch(
    `http://localhost:3000/api/games-by-date?date=${date}`
  );
  if (!gamesRes.ok) {
    throw new Error("Failed to fetch games");
  }
  const gamesData = await gamesRes.json();

  // Fetch historical boxscore for each game
  const playersPromises = gamesData.games.map(async (game: any) => {
    const boxscoreRes = await fetch(
      `http://localhost:3000/api/historical-boxscore?gameId=${game.gameId}`
    );
    if (!boxscoreRes.ok) {
      throw new Error("Failed to fetch historical boxscore");
    }
    const boxscoreData = await boxscoreRes.json();

    return boxscoreData.playerStats.map((player: any) => ({
      personId: player.personId,
      name: player.name,
      matchup: `${game.homeTeam} vs ${game.awayTeam}`,
      points: player.points,
      rebounds: player.rebounds,
      assists: player.assists,
      pra: player.points + player.rebounds + player.assists,
      gameStatus: game.gameStatus,
    }));
  });

  const playersNestedArray = await Promise.all(playersPromises);
  return playersNestedArray.flat();
}

export default async function HistoricalPage({
  params,
}: {
  params: { date: string };
}) {
  const date = parse(params.date, "yyyy-MM-dd", new Date());
  const players = await getPlayersByDate(params.date);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">NBA PRA Leaders</h1>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          Historical Data: {format(date, "MMMM d, yyyy")}
        </h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Player Stats</CardTitle>
          <CardDescription>
            Search and sort through historical NBA player statistics. Top 3 PRA
            leaders are highlighted.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <HistoricalPlayersTable players={players} />
        </CardContent>
      </Card>
    </div>
  );
}
