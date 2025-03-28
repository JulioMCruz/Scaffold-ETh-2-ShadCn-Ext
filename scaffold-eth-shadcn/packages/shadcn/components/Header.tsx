"use client"

import { useState } from "react"
import Link from "next/link"
import { Bug, ChevronDown, Copy, ExternalLink, QrCode, LogOut } from "lucide-react"
import QRCodeModal from "./qr-code-modal"
import { FaucetButton } from "./scaffold-eth/FaucetButton"

import { hardhat } from "viem/chains";
import { useOutsideClick, useTargetNetwork } from "~~/hooks/scaffold-eth";
import { RainbowKitCustomConnectButton } from "./scaffold-eth/RainbowKitCustomConnectButton"


export const Header = () => {
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  //* ********************* */

  const { targetNetwork } = useTargetNetwork();
  const isLocalNetwork = targetNetwork.id === hardhat.id;


  return (
    <>
      <header className="w-full bg-[#2D3748] text-white py-3 px-6 flex items-center justify-between">
        {/* Left: Logo and Title */}
        <div className="flex items-center space-x-3">
          <div className="bg-black rounded p-1 w-8 h-8 flex items-center justify-center">
            <span className="text-white font-bold">⛓</span>
          </div>
          <div>
            <h1 className="font-bold text-lg leading-none">Scaffold-ETH</h1>
            <p className="text-xs text-gray-300">Ethereum dev stack</p>
          </div>
        </div>

        {/* Middle: Navigation */}
        <nav className="flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium hover:text-gray-300 transition-colors">
            Home
          </Link>
          <Link href="/debug" className="text-sm font-medium hover:text-gray-300 transition-colors flex items-center">
            <Bug className="w-4 h-4 mr-1" />
            Debug Contracts
          </Link>
        </nav>

        {/* Right: Wallet Info */}
        <div className="flex items-center space-x-2">
 
        <RainbowKitCustomConnectButton />
        <div className="navbar-end flex-grow mr-4">
            {/* Notifications Icon */}
            {isLocalNetwork && <FaucetButton />}
          </div>

        </div>
 
 
      </header>

    </>
  )
}

