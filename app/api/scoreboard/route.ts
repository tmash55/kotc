import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(
    "https://cdn.nba.com/static/json/liveData/scoreboard/todaysScoreboard_00.json"
  );
  const data = await res.json();
  return NextResponse.json(data);
}
