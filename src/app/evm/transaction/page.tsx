"use client";

import LinkButton from "@/components/LinkButton";

export default function Page() {
  return (
    <div className="flex flex-wrap gap-3">
      <LinkButton
        className="shadow-md"
        href="/evm/transaction/getWalletTransactionsVerbose"
        label="Get verbose transactions of an address"
      />
      <LinkButton
        className="shadow-md"
        href="/evm/transaction/getTransaction"
        label="Get a transaction by transaction hash"
      />
    </div>
  );
}
