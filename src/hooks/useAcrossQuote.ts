import {
  getChainConfig,
  getAcrossQuote,
  type AcrossQuoteParams,
  type AcrossQuote,
} from "@exec402/core";
import { useQuery } from "@tanstack/react-query";

export function useAcrossQuote({
  amount,
  sourceChainId,
  targetChainId,
  inputToken,
  outputToken,
}: AcrossQuoteParams) {
  const sourceChainConfig = sourceChainId
    ? getChainConfig(sourceChainId)
    : undefined;
  const targetChainConfig = getChainConfig(targetChainId);

  return useQuery({
    queryKey: ["acrossQuote", amount.toString(), sourceChainId, targetChainId],
    enabled:
      !!sourceChainId &&
      !!sourceChainConfig &&
      !!targetChainConfig &&
      !!inputToken &&
      !!outputToken &&
      amount > BigInt(0) &&
      sourceChainId !== targetChainId,
    queryFn: async (): Promise<AcrossQuote> => {
      if (!sourceChainId || !targetChainId || !inputToken || !outputToken) {
        throw new Error("Invalid params");
      }

      return getAcrossQuote({
        sourceChainId,
        targetChainId,
        inputToken,
        outputToken,
        amount,
      });
    },
  });
}
