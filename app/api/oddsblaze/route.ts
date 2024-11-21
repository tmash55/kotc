import { NextResponse } from "next/server";

async function fetchOddsBlazeData() {
  const apiKey = process.env.ODDSBLAZE_API_KEY;
  if (!apiKey) {
    throw new Error("ODDSBLAZE_API_KEY is not set in environment variables");
  }

  const url = `https://data.oddsblaze.com/v1/odds/draftkings_nba.json?key=${apiKey}&market=Player%20Points%20%2B%20Rebounds%20%2B%20Assists&live=false`;

  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching OddsBlaze data:", error);
    throw error;
  }
}

export async function GET() {
  try {
    const data = await fetchOddsBlazeData();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch OddsBlaze data" },
      { status: 500 }
    );
  }
}
