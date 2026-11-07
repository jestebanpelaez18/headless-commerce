import { NextResponse } from "next/server";

export async function POST(req: Request) {
  void req;
  return NextResponse.json(
    { error: "Checkout is disabled in this portfolio demo." },
    { status: 403 },
  );
}
