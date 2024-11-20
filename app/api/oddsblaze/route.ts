import { NextResponse } from "next/server";

let cachedData: any = null;
let lastFetchTime: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

async function fetchOddsBlazeData() {
  const apiKey = process.env.ODDSBLAZE_API_KEY;
  if (!apiKey) {
    throw new Error("ODDSBLAZE_API_KEY is not set in environment variables");
  }

  const url = `https://data.oddsblaze.com/v1/odds/draftkings_nba.json?key=${apiKey}&market=Player%20Points%20%2B%20Rebounds%20%2B%20Assists&live=false`;

  try {
    const response = await fetch(url);
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
  const currentTime = Date.now();

  if (!cachedData || currentTime - lastFetchTime > CACHE_DURATION) {
    try {
      cachedData = await fetchOddsBlazeData();
      lastFetchTime = currentTime;
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to fetch OddsBlaze data" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json(cachedData);
}
