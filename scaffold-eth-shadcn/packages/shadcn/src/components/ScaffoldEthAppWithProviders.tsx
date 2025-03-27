"use client";

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider, Config } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "./Header";
import { Chain } from "viem";

const queryClient = new QueryClient();

interface ScaffoldEthAppWithProvidersProps {
  children: React.ReactNode;
  config: Config;
  chains: Chain[];
}

export function ScaffoldEthAppWithProviders({
  children,
  config,
  chains,
}: ScaffoldEthAppWithProvidersProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="relative flex flex-col flex-1">
              {children}
            </main>
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
} 