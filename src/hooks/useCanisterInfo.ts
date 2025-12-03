"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { CanisterInfo } from "@exec402/core";
import { useExecClient } from "../context";

export function useCanisterInfo(
  options?: Omit<UseQueryOptions<CanisterInfo, Error>, "queryKey" | "queryFn">
) {
  const client = useExecClient();

  return useQuery({
    queryKey: ["canister-info"],
    queryFn: () => client.getInfo(),
    ...options,
  });
}

