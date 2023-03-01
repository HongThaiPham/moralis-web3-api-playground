"use client";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import { useEvmWalletNFTCollections } from "@moralisweb3/next";
import { EvmNftCollection } from "moralis/common-evm-utils";

import { useState } from "react";
export default function Page() {
  const [address, setAddress] = useState(process.env.NEXT_PUBLIC_WALLET || "");
  const [isLoading, setIsLoading] = useState(false);
  const [collections, setCollections] = useState<EvmNftCollection[]>([]);
  const { fetch } = useEvmWalletNFTCollections(undefined, {
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
          setCollections(res?.data ?? []);
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
        {collections &&
          collections.length > 0 &&
          collections.map((collection) => {
            return (
              <div
                key={collection.tokenAddress.lowercase}
                className="grid grid-cols-2 gap-3 shadow-sm p-3 rounded-md border-gray-300 border"
              >
                <div>Chain: {collection.chain.display()}</div>
                <div>Address: {collection.tokenAddress.lowercase}</div>
                <div>Name: {collection.name}</div>
                <div>
                  Symbol:{" "}
                  <span className="uppercase text-indigo-700">
                    {collection.symbol}
                  </span>
                </div>
                <div>Type: {collection.contractType}</div>
              </div>
            );
          })}
      </section>
    </div>
  );
}
