// app/api/historical-boxscore/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const gameId = searchParams.get("gameId");

  if (!gameId) {
    return NextResponse.json(
      { error: "GameID parameter is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://stats.nba.com/stats/boxscoretraditionalv2?EndPeriod=1&EndRange=0&GameID=${gameId}&RangeType=0&StartPeriod=1&StartRange=0`
    );

    if (!response.ok) {
      throw new Error("NBA API request failed");
    }

    const data = await response.json();
    const playerStats = data.resultSets[0].rowSet.map((player: any) => ({
      personId: player[4],
      name: player[5],
      teamAbbreviation: player[2],
      points: player[26],
      rebounds: player[20],
      assists: player[21],
    }));

    return NextResponse.json({ playerStats });
  } catch (error) {
    console.error("Error fetching historical boxscore:", error);
    return NextResponse.json(
      { error: "Failed to fetch historical boxscore" },
      { status: 500 }
    );
  }
}
