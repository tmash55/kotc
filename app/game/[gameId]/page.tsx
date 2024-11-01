import PlayerStats from "@/components/kotc/PlayerStats";
import Link from "next/link";

async function getBoxscore(gameId: string) {
  const res = await fetch(`http://localhost:3000/api/boxscore/${gameId}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data.game;
}

export default async function GamePage({
  params,
}: {
  params: { gameId: string };
}) {
  const game = await getBoxscore(params.gameId);

  return (
    <div className="container mx-auto p-4">
      <Link
        href="/"
        className="text-blue-500 hover:underline mb-4 inline-block"
      >
        ← Back to Games
      </Link>
      <h1 className="text-3xl font-bold mb-4">
        {game.awayTeam.teamName} vs {game.homeTeam.teamName}
      </h1>
      <p className="mb-4">
        Final Score: {game.awayTeam.score} - {game.homeTeam.score}
      </p>

      <h2 className="text-2xl font-bold mb-2">Away Team Stats</h2>
      <PlayerStats players={game.awayTeam.players} />

      <h2 className="text-2xl font-bold mt-8 mb-2">Home Team Stats</h2>
      <PlayerStats players={game.homeTeam.players} />
    </div>
  );
}
