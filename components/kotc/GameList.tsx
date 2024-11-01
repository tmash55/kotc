import Link from "next/link";

type Game = {
  gameId: string;
  gameStatusText: string;
  homeTeam: {
    teamName: string;
    score: number;
  };
  awayTeam: {
    teamName: string;
    score: number;
  };
};

type GameListProps = {
  games: Game[];
};

export default function GameList({ games }: GameListProps) {
  return (
    <div className="space-y-4">
      {games.map((game) => (
        <div key={game.gameId} className="border p-4 rounded-lg">
          <h3 className="font-bold">{game.gameStatusText}</h3>
          <p>
            {game.awayTeam.teamName} {game.awayTeam.score} -{" "}
            {game.homeTeam.teamName} {game.homeTeam.score}
          </p>
          <Link
            href={`/game/${game.gameId}`}
            className="text-blue-500 hover:underline"
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
}
