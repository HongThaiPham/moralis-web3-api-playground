"use client";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import { useEvmWalletNFTs } from "@moralisweb3/next";
import { EvmNft } from "moralis/common-evm-utils";

import { useState } from "react";
export default function Page() {
  const [address, setAddress] = useState(process.env.NEXT_PUBLIC_WALLET || "");
  const [isLoading, setIsLoading] = useState(false);
  const [nfts, setNfts] = useState<EvmNft[]>([]);
  const { fetch } = useEvmWalletNFTs(undefined, {
    revalidateOnMount: false,
  });

  const getWalletNFTCollections = () => {
    if (address) {
      try {
        setIsLoading(true);
        fetch({
          chain: process.env.NEXT_PUBLIC_CHAIN_ID!,
          address,
        }).then((res) => {
          setNfts(res?.data ?? []);
        });
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="space-y-3">
      <InputText
        label="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <Button
        label="Call method"
        isLoading={isLoading}
        onClick={getWalletNFTCollections}
      />
      <section className="space-y-3">
        {nfts &&
          nfts.length > 0 &&
          nfts.map((nft) => {
            return (
              <div
                key={`${nft.tokenAddress.lowercase}-${nft.tokenId}`}
                className="shadow-sm p-3 rounded-md border-gray-300 border"
              >
                <div>
                  {nft.name} # {nft.tokenId}
                </div>
                <div>Token address: {nft.tokenAddress.lowercase} </div>
                <div>Name: {nft.name}</div>
                <div>Symbol: {nft.symbol}</div>
                <div>
                  TokenUri:{" "}
                  <a
                    href={nft.tokenUri}
                    className="text-blue-500"
                    target="_blank"
                  >
                    {nft.tokenUri}
                  </a>
                </div>
                <div className="overflow-auto">
                  Metadata:
                  <p>{JSON.stringify(nft.metadata)}</p>
                </div>
                {/* {JSON.stringify(nft)} */}
              </div>
            );
          })}
      </section>
    </div>
  );
}
