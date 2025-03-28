"use client"

import { useState, useEffect } from "react"
import { X, Copy } from "lucide-react"
import { QRCodeSVG } from "qrcode.react";
import { Address as AddressType } from "viem";
import { Address } from "~~/components/scaffold-eth";

interface QRCodeModalProps {
  isOpen: boolean
  onClose: () => void
  address: string
}

export default function QRCodeModal({ isOpen, onClose, address }: QRCodeModalProps) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [copied])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address)
    setCopied(true)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#3A4A6A] rounded-lg shadow-lg w-lg p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-300 hover:text-white">
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col items-center">
          <div className="bg-white p-3 rounded-lg mb-4">
              <QRCodeSVG value={address} size={256} />
              
            </div>

          <div className="flex items-center space-x-2 bg-[#2D3748] rounded-md px-3 py-2 w-full">
            <Address address={address} format="long" disableAddressLink onlyEnsOrAddress />
          </div>
          {copied && <div className="mt-2 text-green-400 text-sm">Address copied to clipboard!</div>}
        </div>
      </div>
    </div>
  )
}

