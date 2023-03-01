"use client";
import LinkButton from "@/components/LinkButton";

export default function EvmPage() {
  return (
    <div>
      <LinkButton
        href="/evm/nft"
        label="NFT API"
        className="bg-blue-500 text-white hover:bg-blue-400"
      />
    </div>
  );
}
