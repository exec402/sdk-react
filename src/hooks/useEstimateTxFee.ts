"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { usePublicClient } from "wagmi";
import type { Task } from "@exec402/core";
import { useExecClient } from "../context";

export interface UseEstimateTxFeeParams {
  task: Task | undefined;
  enabled?: boolean;
}

export function useEstimateTxFee(
  params: UseEstimateTxFeeParams,
  queryOptions?: Omit<
    UseQueryOptions<number | null, Error>,
    "queryKey" | "queryFn" | "enabled"
  >
) {
  const { task, enabled = true } = params;
  const client = useExecClient();
  const publicClient = usePublicClient({ chainId: task?.chainId });

  return useQuery({
    queryKey: ["estimate-tx-fee", task?.taskId],
    queryFn: async () => {
      if (!publicClient || !task) {
        throw new Error("Public client or task not available");
      }

      return client.estimateTxFee(publicClient, task);
    },
    enabled: enabled && !!publicClient && !!task && !!task.attestorSignature,
    staleTime: 60_000, // 1 minute
    ...queryOptions,
  });
}
