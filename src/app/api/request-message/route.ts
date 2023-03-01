import Moralis from "moralis";
import { NextResponse, NextRequest } from "next/server";

Moralis.start({
  apiKey: process.env.MORALIS_API_KEY,
});

const config = {
  domain: process.env.APP_DOMAIN!,
  statement: "Please sign this message to confirm your identity.",
  uri: process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL!,
  timeout: 60,
};

export async function POST(req: NextRequest) {
  const { address, chain, network } = await req.json();

  try {
    const message = await Moralis.Auth.requestMessage({
      address,
      chain,
      network,
      ...config,
    });

    return NextResponse.json({ message });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      {
        status: 500,
      }
    );
  }
}
