"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { usePublicClient, useAccount } from "wagmi";
import type { Task } from "@exec402/core";
import { useExecClient } from "../context";

export function useEstimateTxFee(
  task: Task | undefined,
  queryOptions?: Omit<
    UseQueryOptions<number | null, Error>,
    "queryKey" | "queryFn"
  >
) {
  const client = useExecClient();
  const publicClient = usePublicClient({ chainId: task?.chainId });
  const { address } = useAccount();

  return useQuery({
    queryKey: ["estimate-tx-fee", task?.taskId],
    queryFn: async () => {
      if (!publicClient || !task || !address) {
        throw new Error("Public client or task not available");
      }

      return client.estimateTxFee(publicClient, task, address);
    },
    enabled: !!publicClient && !!address && !!task && !!task.attestorSignature,
    staleTime: 60_000, // 1 minute
    ...queryOptions,
  });
}
