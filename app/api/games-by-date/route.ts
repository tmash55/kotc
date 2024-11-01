// app/api/games-by-date/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json(
      { error: "Date parameter is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://stats.nba.com/stats/scoreboardv2?DayOffset=0&GameDate=${date}&LeagueID=00`
    );

    if (!response.ok) {
      throw new Error("NBA API request failed");
    }

    const data = await response.json();
    const games = data.resultSets[0].rowSet.map((game: any) => ({
      gameId: game[2],
      homeTeam: game[6],
      awayTeam: game[7],
      gameStatus: game[4],
    }));

    return NextResponse.json({ games });
  } catch (error) {
    console.error("Error fetching games:", error);
    return NextResponse.json(
      { error: "Failed to fetch games" },
      { status: 500 }
    );
  }
}
