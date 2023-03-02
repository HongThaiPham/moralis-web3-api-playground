"use client";
import LinkButton from "@/components/LinkButton";

export default function EvmPage() {
  return (
    <div className="flex space-x-3">
      <LinkButton
        href="/evm/nft"
        label="NFT API"
        className="bg-blue-500 text-white hover:bg-blue-400"
      />
      <LinkButton
        href="/evm/transaction"
        label="Transaction API"
        className="bg-blue-500 text-white hover:bg-blue-400"
      />
    </div>
  );
}
