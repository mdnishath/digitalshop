import { NextResponse } from "next/server";

export async function GET() {
  try {
    const site = process.env.NEXT_PUBLIC_SITE_URL;
    const username = process.env.WORDPRESS_USERNAME;
    const appPassword = process.env.WORDPRESS_APP_PASSWORD;

    if (!site || !username || !appPassword) {
      return NextResponse.json(
        { error: "Missing environment variables" },
        { status: 500 }
      );
    }

    const auth = Buffer.from(`${username}:${appPassword}`).toString("base64");

    const res = await fetch(`${site}/wp-json/wc/v3/products`, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch products" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
