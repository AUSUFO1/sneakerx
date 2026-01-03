import { NextResponse } from "next/server";

export async function GET() {
  // simulate async fetch delay
  await new Promise((res) => setTimeout(res, 300));

  // fetch from public folder
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/data/sneakers.json`);
  const data = await res.json();

  return NextResponse.json(data);
}
