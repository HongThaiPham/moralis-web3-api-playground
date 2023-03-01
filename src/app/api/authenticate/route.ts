import * as jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
export default async function GET(req: NextRequest) {
  const token = req.cookies.get("jwt");
  if (!token) return new Response(null, { status: 403 });

  // if the user did not send a jwt token, they are unauthorized

  try {
    const data = jwt.verify(token.value, process.env.SUPABASE_JWT!);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      {
        status: 500,
      }
    );
  }
}
