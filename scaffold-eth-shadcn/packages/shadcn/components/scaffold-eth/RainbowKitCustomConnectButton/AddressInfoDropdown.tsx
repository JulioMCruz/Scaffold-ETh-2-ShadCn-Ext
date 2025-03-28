import { useRef, useState } from "react";
import { NetworkOptions } from "./NetworkOptions";
import CopyToClipboard from "react-copy-to-clipboard";
import { getAddress } from "viem";
import { Address } from "viem";
import { useDisconnect } from "wagmi";
import {
  ArrowLeftOnRectangleIcon,
  ArrowTopRightOnSquareIcon,
  ArrowsRightLeftIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  DocumentDuplicateIcon,
  QrCodeIcon,
} from "@heroicons/react/24/outline";
import { BlockieAvatar, isENS } from "~~/components/scaffold-eth";
import { useOutsideClick } from "~~/hooks/scaffold-eth";
import { getTargetNetworks } from "~~/utils/scaffold-eth";
import { Bug, ChevronDown, Copy, ExternalLink, QrCode, LogOut } from "lucide-react"
import { Button } from "~~/components/ui/button";



const allowedNetworks = getTargetNetworks();

type AddressInfoDropdownProps = {
  address: Address;
  blockExplorerAddressLink: string | undefined;
  displayName: string;
  ensAvatar?: string;
};

export const AddressInfoDropdown = ({
  address,
  ensAvatar,
  displayName,
  blockExplorerAddressLink,
}: AddressInfoDropdownProps) => {
  const { disconnect } = useDisconnect();
  const checkSumAddress = getAddress(address);

  const [addressCopied, setAddressCopied] = useState(false);

  const [selectingNetwork, setSelectingNetwork] = useState(false);
  const dropdownRef = useRef<HTMLDetailsElement>(null);
  const closeDropdown = () => {
    setSelectingNetwork(false);
    dropdownRef.current?.removeAttribute("open");
  };
  useOutsideClick(dropdownRef, closeDropdown);

  /* ********************* */

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const address = "0x024F...3d19";
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

   const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    setIsDropdownOpen(false)
  }

  const openQRModal = () => {
    setIsQRModalOpen(true)
    setIsDropdownOpen(false)
  }

  const viewOnBlockExplorer = () => {
    window.open(`${blockExplorerAddressLink}`, "_blank");
    setIsDropdownOpen(false)
  }

  // const disconnect = () => {
  //   // Implement disconnect logic here
  //   console.log("Disconnected")
  //   setIsDropdownOpen(false)
  // }

  //* ********************* */



  return (
    <>
      {/* <details ref={dropdownRef} className="dropdown dropdown-end leading-3">
        <summary tabIndex={0} className="btn btn-secondary btn-sm pl-0 pr-2 shadow-md dropdown-toggle gap-0 !h-auto">
          <BlockieAvatar address={checkSumAddress} size={30} ensImage={ensAvatar} />
          <span className="ml-2 mr-1">
            {isENS(displayName) ? displayName : checkSumAddress?.slice(0, 6) + "..." + checkSumAddress?.slice(-4)}
          </span>
          <ChevronDownIcon className="h-6 w-4 ml-2 sm:ml-0" />
        </summary>
        <ul
          tabIndex={0}
          className="dropdown-content menu z-[2] p-2 mt-2 shadow-center shadow-accent bg-base-200 rounded-box gap-1"
        >
          <NetworkOptions hidden={!selectingNetwork} />
          <li className={selectingNetwork ? "hidden" : ""}>
            {addressCopied ? (
              <div className="btn-sm !rounded-xl flex gap-3 py-3">
                <CheckCircleIcon
                  className="text-xl font-normal h-6 w-4 cursor-pointer ml-2 sm:ml-0"
                  aria-hidden="true"
                />
                <span className=" whitespace-nowrap">Copy address</span>
              </div>
            ) : (
              <CopyToClipboard
                text={checkSumAddress}
                onCopy={() => {
                  setAddressCopied(true);
                  setTimeout(() => {
                    setAddressCopied(false);
                  }, 800);
                }}
              >
                <div className="btn-sm !rounded-xl flex gap-3 py-3">
                  <DocumentDuplicateIcon
                    className="text-xl font-normal h-6 w-4 cursor-pointer ml-2 sm:ml-0"
                    aria-hidden="true"
                  />
                  <span className=" whitespace-nowrap">Copy address</span>
                </div>
              </CopyToClipboard>
            )}
          </li>
          <li className={selectingNetwork ? "hidden" : ""}>
            <label htmlFor="qrcode-modal" className="btn-sm !rounded-xl flex gap-3 py-3">
              <QrCodeIcon className="h-6 w-4 ml-2 sm:ml-0" />
              <span className="whitespace-nowrap">View QR Code</span>
            </label>
          </li>
          <li className={selectingNetwork ? "hidden" : ""}>
            <button className="menu-item btn-sm !rounded-xl flex gap-3 py-3" type="button">
              <ArrowTopRightOnSquareIcon className="h-6 w-4 ml-2 sm:ml-0" />
              <a
                target="_blank"
                href={blockExplorerAddressLink}
                rel="noopener noreferrer"
                className="whitespace-nowrap"
              >
                View on Block Explorer
              </a>
            </button>
          </li>
          {allowedNetworks.length > 1 ? (
            <li className={selectingNetwork ? "hidden" : ""}>
              <button
                className="btn-sm !rounded-xl flex gap-3 py-3"
                type="button"
                onClick={() => {
                  setSelectingNetwork(true);
                }}
              >
                <ArrowsRightLeftIcon className="h-6 w-4 ml-2 sm:ml-0" /> <span>Switch Network</span>
              </button>
            </li>
          ) : null}
          <li className={selectingNetwork ? "hidden" : ""}>
            <button
              className="menu-item text-error btn-sm !rounded-xl flex gap-3 py-3"
              type="button"
              onClick={() => disconnect()}
            >
              <ArrowLeftOnRectangleIcon className="h-6 w-4 ml-2 sm:ml-0" /> <span>Disconnect</span>
            </button>
          </li>
        </ul>
      </details> */}

      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center space-x-2 bg-[#3A4A5F] rounded-md px-2 py-1 hover:bg-[#455A70] transition-colors"
        >
          <div className="bg-green-500 rounded-full w-6 h-6 flex items-center justify-center">
            <BlockieAvatar address={checkSumAddress} size={30} ensImage={ensAvatar} />
          </div>
          <span className="text-sm">
            {isENS(displayName) ? displayName : checkSumAddress?.slice(0, 6) + "..." + checkSumAddress?.slice(-4)}
          </span>
          <ChevronDownIcon className="h-6 w-4 ml-2 sm:ml-0" />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-[#2D3748] rounded-md shadow-lg z-10 border border-[#3A4A6A]">
            <div className="py-1">
              <NetworkOptions hidden={!selectingNetwork} />
              <button
                onClick={copyAddress}
                className={`w-full px-4 py-3 text-sm text-gray-200 hover:bg-[#3A4A6A] flex items-center ${selectingNetwork ? "hidden" : ""}`}
              >
                <Copy className="h-4 w-4 mr-3" />
                <span>Copy address</span>
              </button>
              <button
                onClick={openQRModal}
                className={`w-full px-4 py-3 text-sm text-gray-200 hover:bg-[#3A4A6A] flex items-center ${selectingNetwork ? "hidden" : ""}`}
              >
                <QrCode className="h-4 w-4 mr-3" />
                <span>View QR Code</span>
              </button>
              <button
                onClick={viewOnBlockExplorer}
                className={`w-full px-4 py-3 text-sm text-gray-200 hover:bg-[#3A4A6A] flex items-center ${selectingNetwork ? "hidden" : ""}`}
              >
                <ExternalLink className="h-4 w-4 mr-3" />
                <span>View on Block Explorer</span>
              </button>
              <Button
                onClick={() => disconnect()}
                className={`w-full px-4 py-3 text-sm text-red-400 hover:bg-[#3A4A6A] flex items-center ${selectingNetwork ? "hidden" : ""}`}
              >
                <LogOut className="h-4 w-4 mr-3" />
                <span>Disconnect</span>
              </Button>
            </div>
          </div>
        )}
      </div>

    </>
  );
};
