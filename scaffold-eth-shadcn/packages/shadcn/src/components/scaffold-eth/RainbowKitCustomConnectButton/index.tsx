"use client";

import { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { Balance } from "../Balance";
import { BlockieAvatar } from "../BlockieAvatar";

/**
 * Custom Wagmi Connect Button (watch balance + custom design)
 */
export function RainbowKitCustomConnectButton() {
  const { address } = useAccount();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, mounted: connectMounted }) => {
        const connected = connectMounted && account && chain;

        return (
          <>
            {(() => {
              if (!connected) {
                return (
                  <button onClick={openConnectModal} type="button" className="btn btn-primary btn-sm">
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <div className="rounded-full bg-red-100 px-4 py-1 text-red-800">
                    Wrong network
                  </div>
                );
              }

              return (
                <div className="flex items-center gap-2">
                  <Balance address={address} />
                  <BlockieAvatar address={address} size={24} />
                </div>
              );
            })()}
          </>
        );
      }}
    </ConnectButton.Custom>
  );
} 