"use client";

import LinkButton from "@/components/LinkButton";

export default function Page() {
  return (
    <div className="flex flex-wrap gap-3">
      <LinkButton
        className="shadow-md"
        href="/evm/nft/getWalletNFTCollections"
        label="Get all the NFT collections owned by an address"
      />
      <LinkButton
        className="shadow-m"
        label="Get all the NFTs owned by an address"
        href="/evm/nft/getWalletNFTs"
      />
    </div>
  );
}
