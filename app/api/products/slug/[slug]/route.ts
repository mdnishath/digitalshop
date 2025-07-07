import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const site = process.env.NEXT_PUBLIC_SITE_URL;
    const username = process.env.WORDPRESS_USERNAME;
    const appPassword = process.env.WORDPRESS_APP_PASSWORD;

    if (!site || !username || !appPassword) {
      return NextResponse.json({ error: "Missing env vars" }, { status: 500 });
    }

    const auth = Buffer.from(`${username}:${appPassword}`).toString("base64");

    const res = await fetch(`${site}/wp-json/wc/v3/products?slug=${slug}`, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: res.status }
      );
    }

    const data = await res.json();
    console.log(data.images);

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
