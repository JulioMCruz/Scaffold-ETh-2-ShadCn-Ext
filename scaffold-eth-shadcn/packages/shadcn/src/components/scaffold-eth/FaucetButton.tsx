"use client";

import { useCallback, useState } from "react";
import { useAccount } from "wagmi";
import { Button } from "../ui/button";
import { useTargetNetwork } from "../../hooks/scaffold-eth/useTargetNetwork";

/**
 * FaucetButton button which lets you grab eth.
 */
export function FaucetButton() {
  const { address } = useAccount();
  const { targetNetwork } = useTargetNetwork();

  const [loading, setLoading] = useState(false);

  const processRequest = useCallback(async () => {
    if (!address) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/faucet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address,
          chainId: targetNetwork.id,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      const data = await response.json();
      console.log("Faucet response: ", data);
    } catch (error) {
      console.error("⚡️ ~ file: FaucetButton.tsx:error", error);
    } finally {
      setLoading(false);
    }
  }, [address, targetNetwork.id]);

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={processRequest}
      disabled={loading}
      className="gap-2"
    >
      {loading ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : (
        <span>Faucet</span>
      )}
    </Button>
  );
} 