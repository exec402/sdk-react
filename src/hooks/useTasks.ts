"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { TaskPage, ListTasksOptions } from "@exec402/core";
import { useExecClient } from "../context";

export function useTasks(
  listOptions?: ListTasksOptions,
  queryOptions?: Omit<UseQueryOptions<TaskPage, Error>, "queryKey" | "queryFn">
) {
  const client = useExecClient();

  return useQuery({
    queryKey: ["tasks", listOptions],
    queryFn: () => client.listTasks(listOptions ?? {}),
    ...queryOptions,
  });
}

