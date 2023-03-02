import { EvmTransactionLog } from "moralis/common-evm-utils";

export default function isMintNftTransaction(logs: EvmTransactionLog[]) {
  if (logs && logs.length > 0) {
    const findLog = logs.find(
      (log) =>
        log.topics[0] === process.env.NEXT_PUBLIC_TOPIC_MINT &&
        log.topics[1] === process.env.NEXT_PUBLIC_TOPIC_ZERO &&
        log.topics[3]
    );
    return findLog
      ? {
          tokenAddress: findLog.topics[2],
          tokenId: parseInt(findLog.topics[3]!, 16),
        }
      : null;
  }
  return null;
}
