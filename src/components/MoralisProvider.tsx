"use client";
import { ReactNode } from "react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { bscTestnet } from "wagmi/chains";

const { provider, webSocketProvider } = configureChains(
  [bscTestnet],
  [publicProvider()]
);

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
});
export default function MoralisProvider({ children }: { children: ReactNode }) {
  return <WagmiConfig client={client}>{children}</WagmiConfig>;
}
