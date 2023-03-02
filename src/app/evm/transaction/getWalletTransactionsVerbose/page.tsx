"use client";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import { useEvmWalletTransactionsVerbose } from "@moralisweb3/next";
import clsx from "clsx";
import { EvmTransaction, EvmTransactionLog } from "moralis/common-evm-utils";
import { useState } from "react";

export default function Page() {
  const [address, setAddress] = useState(process.env.NEXT_PUBLIC_WALLET || "");
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState<EvmTransaction[]>([]);

  const { fetch } = useEvmWalletTransactionsVerbose(undefined, {
    revalidateOnMount: false,
  });

  const getWalletTransactionsVerbose = () => {
    if (address) {
      try {
        setIsLoading(true);
        fetch({
          chain: process.env.NEXT_PUBLIC_CHAIN_ID!,
          address,
          limit: 30,
        }).then((res) => {
          console.log("res", res);
          setTransactions(res?.data ?? []);
        });
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    }
  };

  const isMintNft = (logs: EvmTransactionLog[]) => {
    if (logs && logs.length > 0) {
      const findLog = logs.find(
        (log) =>
          log.topics[0] === process.env.NEXT_PUBLIC_TOPIC_MINT &&
          log.topics[1] === process.env.NEXT_PUBLIC_TOPIC_ZERO &&
          log.topics[3]
      );
      return findLog ? parseInt(findLog.topics[3]!, 16) : null;
    }
    return null;
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
        onClick={getWalletTransactionsVerbose}
      />
      <section className="space-y-3">
        {transactions &&
          transactions.length > 0 &&
          transactions.map((ts) => {
            const nftTokenId = isMintNft(ts.logs);
            return (
              <div
                key={ts.hash}
                className={clsx(
                  "shadow-sm p-3 rounded-md border-gray-300 border",
                  nftTokenId != null && "bg-green-500 text-white"
                )}
              >
                <div>Hash: {ts.hash}</div>
                <div>Block: {ts.blockNumber.toString()}</div>
                <div>From: {ts.from.lowercase}</div>
                <div>To: {ts.to?.lowercase}</div>
                <div>Value: {ts.value?.value.toString()}</div>
                <div>Gas: {ts.gas?.toString()}</div>
                <div>Gas Price: {ts.gasPrice.toString()}</div>
                <div>Nonce: {ts.nonce?.toString()}</div>

                {nftTokenId != null && (
                  <div>
                    Transaction mint NFT token id:{" "}
                    <span className="font-bold">{nftTokenId}</span>
                  </div>
                )}
              </div>
            );
          })}
      </section>
    </div>
  );
}
