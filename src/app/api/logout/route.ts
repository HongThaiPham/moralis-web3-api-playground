import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  return NextResponse.json(null, {
    headers: {
      "Set-Cookie": `jwt=; HttpOnly; Path=/; SameSite=lax;`,
    },
  });
}
