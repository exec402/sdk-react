"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { Task } from "@exec402/core";
import { useExecClient } from "../context";

export function useTask(
  taskId: string,
  options?: Omit<UseQueryOptions<Task, Error>, "queryKey" | "queryFn">
) {
  const client = useExecClient();

  return useQuery({
    queryKey: ["task", taskId],
    queryFn: () => client.getTask(taskId),
    enabled: !!taskId,
    ...options,
  });
}

