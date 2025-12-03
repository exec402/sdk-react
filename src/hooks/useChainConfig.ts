"use client";

import { useMemo } from "react";
import { useChainId } from "wagmi";
import {
  getChainConfig,
  getDefaultChainConfig,
  type ChainConfig,
} from "@exec402/core";
import { useExecContext } from "../context";

export function useChainConfig(chainId?: number): ChainConfig | undefined {
  const currentChainId = useChainId();
  const targetChainId = chainId ?? currentChainId;

  return useMemo(() => getChainConfig(targetChainId), [targetChainId]);
}

export function useDefaultChainConfig(): ChainConfig | undefined {
  const { network } = useExecContext();

  return useMemo(() => getDefaultChainConfig(network), [network]);
}
