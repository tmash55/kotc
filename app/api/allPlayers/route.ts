import { NextResponse } from "next/server";

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

async function fetchScoreboard() {
  const res = await fetch(
    "https://cdn.nba.com/static/json/liveData/scoreboard/todaysScoreboard_00.json",
    {
      next: { revalidate: 60 },
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
    }
  );
  if (!res.ok) {
    throw new Error(
      `Failed to fetch scoreboard: ${res.status} ${res.statusText}`
    );
  }
  const data = await res.json();
  return data.scoreboard;
}

async function fetchBoxscore(gameId: string) {
  try {
    const res = await fetch(
      `https://cdn.nba.com/static/json/liveData/boxscore/boxscore_${gameId}.json`,
      {
        next: { revalidate: 60 },
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      }
    );
    if (!res.ok) {
      throw new Error(
        `Failed to fetch boxscore: ${res.status} ${res.statusText}`
      );
    }
    const data = await res.json();
    return data.game;
  } catch (error) {
    console.error(`Error fetching boxscore for game ${gameId}:`, error);
    return null;
  }
}

export async function GET() {
  try {
    const scoreboard = await fetchScoreboard();
    let allPlayers: Player[] = [];
    let allGamesFinal = true;

    if (scoreboard.games.length === 0) {
      return NextResponse.json({
        message: "No games scheduled for today",
        players: [],
        allGamesFinal: true,
      });
    }

    for (const game of scoreboard.games) {
      const boxscore = await fetchBoxscore(game.gameId);
      if (!boxscore) {
        // If we couldn't fetch the boxscore, skip this game
        continue;
      }

      const players = [
        ...boxscore.homeTeam.players,
        ...boxscore.awayTeam.players,
      ];
      const matchup = `${game.awayTeam.teamTricode} @ ${game.homeTeam.teamTricode}`;

      if (game.gameStatus !== 3) {
        allGamesFinal = false;
      }

      const gameStatus =
        game.gameStatus === 2
          ? `${game.period}Q ${game.gameClock}`
          : game.gameStatusText;

      allPlayers = allPlayers.concat(
        players.map((player) => ({
          personId: player.personId,
          name: player.name,
          matchup: matchup,
          points: player.statistics.points,
          rebounds: player.statistics.reboundsTotal,
          assists: player.statistics.assists,
          pra:
            player.statistics.points +
            player.statistics.reboundsTotal +
            player.statistics.assists,
          gameStatus: gameStatus.trim(),
          gameClock: game.gameClock,
          period: game.period,
          gameDate: scoreboard.gameDate,
        }))
      );
    }

    allPlayers.sort((a, b) => b.pra - a.pra);

    console.log(
      `Fetched ${allPlayers.length} players for ${scoreboard.gameDate}`
    );

    return NextResponse.json({
      players: allPlayers,
      allGamesFinal,
      gameDate: scoreboard.gameDate,
      gamesCount: scoreboard.games.length,
    });
  } catch (error) {
    console.error("Error fetching player data:", error);
    return NextResponse.json(
      { error: "Failed to fetch player data" },
      { status: 500 }
    );
  }
}
