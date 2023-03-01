import { NextResponse, NextRequest } from "next/server";

import Moralis from "moralis";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!
);

Moralis.start({
  apiKey: process.env.MORALIS_API_KEY,
});

import * as jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  console.log("verify.ts");
  try {
    const { message, signature } = await req.json();

    const result = await Moralis.Auth.verify({
      signature,
      message,
      networkType: "evm",
    });

    const authData = result.toJSON();

    console.log("authData", authData);

    let { data: user } = await supabase
      .from("users")
      .select("*")
      .eq("moralis_provider_id", authData.profileId)
      .single();

    console.log("user", user);

    if (!user) {
      const response = await supabase
        .from("users")
        .insert({ moralis_provider_id: authData.profileId, metadata: authData })
        .single();
      user = response.data;
    }

    const token = jwt.sign(
      {
        ...user,
        aud: "authenticated",
        role: "authenticated",
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
      },
      process.env.SUPABASE_JWT!
    );

    console.log("token", token);

    return NextResponse.json(user, {
      headers: {
        "Set-Cookie": `jwt=${token}; path=/; sameSite=lax; httpOnly=true`,
      },
    });
    // .cookies.set("jwt", token, {
    //   path: "/",
    //   sameSite: "lax",
    //   httpOnly: true,
    // });

    console.log("xxx", xxx);
    return xxx;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: (error as Error).message },
      {
        status: 500,
      }
    );
  }
}
