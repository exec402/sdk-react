"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useWalletClient } from "wagmi";
import { ExecClient, type ExecNetwork } from "@exec402/core";

interface ExecContextValue {
  client: ExecClient;
  network: ExecNetwork;
}

const ExecContext = createContext<ExecContextValue | null>(null);

export interface ExecProviderProps {
  children: ReactNode;
  network?: ExecNetwork;
}

export function ExecProvider({
  children,
  network = "testnet",
}: ExecProviderProps) {
  const { data: walletClient } = useWalletClient();

  const client = useMemo(
    () =>
      new ExecClient({
        network,
        // eslint-disable-next-line
        signer: walletClient as any,
      }),
    [network, walletClient]
  );

  return (
    <ExecContext.Provider value={{ client, network }}>
      {children}
    </ExecContext.Provider>
  );
}

export function useExecContext(): ExecContextValue {
  const context = useContext(ExecContext);
  if (!context) {
    throw new Error("useExecContext must be used within ExecProvider");
  }
  return context;
}

export function useExecClient(): ExecClient {
  return useExecContext().client;
}
