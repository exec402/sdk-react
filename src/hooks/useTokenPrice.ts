"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { usePublicClient } from "wagmi";
import { getTokenPrice, type TokenPriceResult } from "@exec402/core";

export interface UseTokenPriceParams {
  chainId: number;
  tokenAddress: `0x${string}`;
  amountIn?: bigint;
  enabled?: boolean;
}

export function useTokenPrice(
  params: UseTokenPriceParams,
  queryOptions?: Omit<
    UseQueryOptions<TokenPriceResult | null, Error>,
    "queryKey" | "queryFn" | "enabled"
  >
) {
  const { chainId, tokenAddress, amountIn, enabled = true } = params;
  const publicClient = usePublicClient({ chainId });

  return useQuery({
    queryKey: ["token-price", chainId, tokenAddress, amountIn?.toString()],
    queryFn: async () => {
      if (!publicClient) {
        throw new Error("Public client not available");
      }

      return getTokenPrice({
        publicClient,
        chainId,
        tokenIn: tokenAddress,
        amountIn,
      });
    },
    enabled: enabled && !!publicClient,
    staleTime: 30_000, // 30 seconds
    ...queryOptions,
  });
}
