"use client";

import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { Task } from "@exec402/core";
import { useExecClient } from "../context";

export function useExecuteTransfer(
  options?: Omit<UseMutationOptions<`0x${string}`, Error, Task>, "mutationFn">
) {
  const client = useExecClient();

  return useMutation({
    mutationFn: (task: Task) => client.executeTransfer(task),
    ...options,
  });
}

