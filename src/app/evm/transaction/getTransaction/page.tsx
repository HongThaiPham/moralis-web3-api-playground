"use client";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import isMintNftTransaction from "@/utils/isMintNftTransaction";
import { useEvmTransaction } from "@moralisweb3/next";
import clsx from "clsx";
import { EvmTransaction } from "moralis/common-evm-utils";
import { useState } from "react";

export default function Page() {
  const [address, setAddress] = useState(process.env.NEXT_PUBLIC_WALLET || "");
  const [isLoading, setIsLoading] = useState(false);
  const [transaction, setTransaction] = useState<EvmTransaction | null>(null);

  const { fetch } = useEvmTransaction(undefined, {
    revalidateOnMount: false,
  });

  const getTransaction = () => {
    if (address) {
      try {
        setIsLoading(true);
        fetch({
          chain: process.env.NEXT_PUBLIC_CHAIN_ID!,
          transactionHash: address,
        })
          .then((res) => {
            if (res) {
              setTransaction(res);
            }
          })
          .catch((err) => {
            alert("Invalid input or transaction not found");
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
        label="Transaction Hash"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <Button
        label="Call method"
        isLoading={isLoading}
        onClick={getTransaction}
      />
      <section className="space-y-3">
        {transaction && (
          <div
            key={transaction.hash}
            className={clsx(
              "shadow-sm p-3 rounded-md border-gray-300 border",
              isMintNftTransaction(transaction.logs) != null &&
                "bg-green-500 text-white"
            )}
          >
            <div>Hash: {transaction.hash}</div>
            <div>Block: {transaction.blockNumber.toString()}</div>
            <div>From: {transaction.from.lowercase}</div>
            <div>To: {transaction.to?.lowercase}</div>
            <div>Value: {transaction.value?.value.toString()}</div>
            <div>Gas: {transaction.gas?.toString()}</div>
            <div>Gas Price: {transaction.gasPrice.toString()}</div>
            <div>Nonce: {transaction.nonce?.toString()}</div>
            <div>
              Logs:{" "}
              <p className="overflow-auto">
                {JSON.stringify(transaction.logs)}
              </p>
            </div>

            {isMintNftTransaction(transaction.logs) != null && (
              <div>
                Transaction mint NFT token id:{" "}
                <span className="font-bold">
                  {isMintNftTransaction(transaction.logs)?.tokenId.toString()}
                </span>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
