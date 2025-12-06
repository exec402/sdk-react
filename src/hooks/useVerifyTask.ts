"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { useExecClient } from "../context";
import { usePublicClient } from "wagmi";

export interface UseVerifyTaskOptions
  extends Omit<UseQueryOptions<boolean, Error>, "queryKey" | "queryFn"> {
  /** Polling interval in milliseconds. Default: 3000 */
  pollingInterval?: number;
}

export function useVerifyTask(
  taskId: `0x${string}` | undefined,
  options?: UseVerifyTaskOptions
) {
  const client = useExecClient();
  const publicClient = usePublicClient();
  const { pollingInterval = 3000, ...queryOptions } = options ?? {};

  return useQuery({
    queryKey: ["verify-task", taskId],
    queryFn: async () => {
      if (!publicClient) {
        throw new Error(
          "PublicClient not available. Make sure wagmi is configured."
        );
      }
      if (!taskId) {
        throw new Error("Task ID is required");
      }
      return client.verify(publicClient, taskId);
    },
    enabled: !!publicClient && !!taskId,
    refetchInterval: (query) => {
      const isExecuted = query.state.data;
      if (isExecuted) {
        return false;
      }
      return pollingInterval;
    },
    ...queryOptions,
  });
}
