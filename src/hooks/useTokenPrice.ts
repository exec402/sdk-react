"use client";

import { useMemo } from "react";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { usePublicClient } from "wagmi";
import {
  getTokenPrice,
  getChainConfig,
  type TokenPriceResult,
} from "@exec402/core";

export interface UseTokenPriceParams {
  chainId: number;
  /** Token address. Defaults to WETH if not provided. */
  tokenAddress?: `0x${string}`;
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

  const tokenIn = useMemo(() => {
    if (tokenAddress) return tokenAddress;
    const chainConfig = getChainConfig(chainId);
    return chainConfig?.tokens.weth;
  }, [tokenAddress, chainId]);

  return useQuery({
    queryKey: ["token-price", chainId, tokenIn, amountIn?.toString()],
    queryFn: async () => {
      if (!publicClient) {
        throw new Error("Public client not available");
      }
      if (!tokenIn) {
        throw new Error("Token address not available");
      }

      return getTokenPrice({
        publicClient,
        chainId,
        tokenIn,
        amountIn,
      });
    },
    enabled: enabled && !!publicClient && !!tokenIn,
    staleTime: 30_000, // 30 seconds
    ...queryOptions,
  });
}
