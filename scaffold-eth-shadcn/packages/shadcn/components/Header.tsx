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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const address = "0x024F...3d19";
  const balance = "1.0000 ETH";
  const network = "Hardhat";
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

   const fullAddress = "0x024F2E22A1c0008D362E7dACf108F11781493d19";


   const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(fullAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    setIsDropdownOpen(false)
  }

  const openQRModal = () => {
    setIsQRModalOpen(true)
    setIsDropdownOpen(false)
  }

  const viewOnBlockExplorer = () => {
    window.open(`https://etherscan.io/address/${fullAddress}`, "_blank")
    setIsDropdownOpen(false)
  }

  const disconnect = () => {
    // Implement disconnect logic here
    console.log("Disconnected")
    setIsDropdownOpen(false)
  }

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
 
          {/* 

          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2 bg-[#3A4A5F] rounded-md px-2 py-1 hover:bg-[#455A70] transition-colors"
            >
              <div className="bg-green-500 rounded-full w-6 h-6 flex items-center justify-center">
                <div className="bg-green-600 rounded-full w-5 h-5"></div>
              </div>
              <span className="text-sm">{address}</span>
              <ChevronDown className="h-4 w-4 text-gray-300" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-[#2D3748] rounded-md shadow-lg z-10 border border-[#3A4A6A]">
                <div className="py-1">
                  <button
                    onClick={copyAddress}
                    className="w-full px-4 py-3 text-sm text-gray-200 hover:bg-[#3A4A6A] flex items-center"
                  >
                    <Copy className="h-4 w-4 mr-3" />
                    <span>Copy address</span>
                  </button>
                  <button
                    onClick={openQRModal}
                    className="w-full px-4 py-3 text-sm text-gray-200 hover:bg-[#3A4A6A] flex items-center"
                  >
                    <QrCode className="h-4 w-4 mr-3" />
                    <span>View QR Code</span>
                  </button>
                  <button
                    onClick={viewOnBlockExplorer}
                    className="w-full px-4 py-3 text-sm text-gray-200 hover:bg-[#3A4A6A] flex items-center"
                  >
                    <ExternalLink className="h-4 w-4 mr-3" />
                    <span>View on Block Explorer</span>
                  </button>
                  <button
                    onClick={disconnect}
                    className="w-full px-4 py-3 text-sm text-red-400 hover:bg-[#3A4A6A] flex items-center"
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    <span>Disconnect</span>
                  </button>
                </div>
              </div>
            )}
          </div>
           */}
 
        <RainbowKitCustomConnectButton />
        <div className="navbar-end flex-grow mr-4">
            {/* Notifications Icon */}
            {isLocalNetwork && <FaucetButton />}
          </div>

        </div>
 
 
      </header>

      {/* QR Code Modal */}
      <QRCodeModal isOpen={isQRModalOpen} onClose={() => setIsQRModalOpen(false)} address={fullAddress} />
    </>
  )
}

