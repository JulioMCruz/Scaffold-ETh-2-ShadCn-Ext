"use client"

import { useState, useEffect } from "react"
import { X, Copy } from "lucide-react"
import QRCode from "qrcode.react";

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
      <div className="bg-[#3A4A6A] rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-300 hover:text-white">
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col items-center">
          <div className="bg-white p-3 rounded-lg mb-4">
            <QRCode value={address} size={200} renderAs="svg" />
          </div>

          <div className="flex items-center space-x-2 bg-[#2D3748] rounded-md px-3 py-2 w-full">
            <div className="bg-green-500 rounded-full w-5 h-5 flex-shrink-0"></div>
            <span className="text-sm text-white truncate flex-1">{address}</span>
            <button onClick={copyToClipboard} className="text-gray-300 hover:text-white" title="Copy address">
              <Copy className="h-4 w-4" />
            </button>
          </div>
          {copied && <div className="mt-2 text-green-400 text-sm">Address copied to clipboard!</div>}
        </div>
      </div>
    </div>
  )
}

