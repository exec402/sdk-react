"use client";

import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { TransferParams, TaskResult } from "@exec402/core";
import { useExecClient } from "../context";

export function useTransfer(
  options?: Omit<
    UseMutationOptions<TaskResult, Error, TransferParams>,
    "mutationFn"
  >
) {
  const client = useExecClient();

  return useMutation({
    mutationFn: (params: TransferParams) => client.transfer(params),
    ...options,
  });
}

