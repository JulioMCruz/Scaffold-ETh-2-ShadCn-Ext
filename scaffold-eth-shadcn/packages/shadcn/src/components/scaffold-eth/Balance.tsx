"use client";

import { useEffect, useState } from "react";
import { formatEther } from "viem";
import { useBalance } from "wagmi";
import { useTargetNetwork } from "../../hooks/scaffold-eth/useTargetNetwork";

type BalanceProps = {
  address: `0x${string}`;
  className?: string;
};

/**
 * Display (ETH & USD) balance of an ETH address.
 */
export function Balance({ address, className = "" }: BalanceProps) {
  const { targetNetwork } = useTargetNetwork();
  const { data: balance } = useBalance({
    address,
    chainId: targetNetwork.id,
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className={`w-full flex items-center ${className}`}>
      {balance ? (
        <>
          <div className="w-full flex items-center justify-center">
            <span>{formatEther(balance?.value ?? BigInt(0)).slice(0, 5)}</span>
            <span className="text-xs font-bold ml-1">{balance.symbol}</span>
          </div>
        </>
      ) : (
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded-md w-12"></div>
        </div>
      )}
    </div>
  );
} 