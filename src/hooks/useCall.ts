"use client";

import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { CallParams, TaskResult } from "@exec402/core";
import { useExecClient } from "../context";

export function useCall(
  options?: Omit<
    UseMutationOptions<TaskResult, Error, CallParams>,
    "mutationFn"
  >
) {
  const client = useExecClient();

  return useMutation({
    mutationFn: (params: CallParams) => client.call(params),
    ...options,
  });
}

