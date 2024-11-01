import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { gameId: string } }
) {
  const gameId = params.gameId;
  const res = await fetch(
    `https://cdn.nba.com/static/json/liveData/boxscore/boxscore_${gameId}.json`
  );
  const data = await res.json();
  return NextResponse.json(data);
}
