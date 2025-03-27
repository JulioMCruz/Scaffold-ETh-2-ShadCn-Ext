"use client";

import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { hardhat } from "viem/chains";
import { Bars3Icon, BugAntIcon } from "@heroicons/react/24/outline";
import { FaucetButton, RainbowKitCustomConnectButton } from "./scaffold-eth";
import { useOutsideClick, useTargetNetwork } from "../hooks/scaffold-eth";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

const menuLinks: HeaderMenuLink[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Debug Contracts",
    href: "/debug",
    icon: <BugAntIcon className="h-4 w-4" />,
  },
];

const HeaderMenuLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {menuLinks.map(({ label, href, icon }) => {
        const isActive = pathname === href;
        return (
          <li key={href} className="list-none">
            <Link
              href={href}
              className={`${
                isActive ? "bg-secondary" : ""
              } hover:bg-secondary focus:bg-secondary active:text-primary-foreground flex items-center gap-2 rounded-full px-3 py-1.5 text-sm transition-colors`}
            >
              {icon}
              <span>{label}</span>
            </Link>
          </li>
        );
      })}
    </>
  );
};

export function Header() {
  const { targetNetwork } = useTargetNetwork();
  const isLocalNetwork = targetNetwork.id === hardhat.id;

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  );

  return (
    <div className="sticky top-0 z-20 flex min-h-0 flex-shrink-0 justify-between border-b bg-background px-0 shadow-sm sm:px-2 lg:static">
      <div className="w-auto lg:w-1/2">
        <div className="lg:hidden" ref={burgerMenuRef}>
          <DropdownMenu open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="ml-1 px-2"
                onClick={() => setIsDrawerOpen(prev => !prev)}
              >
                <Bars3Icon className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52">
              <HeaderMenuLinks />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Link href="/" className="hidden items-center gap-2 ml-4 mr-6 shrink-0 lg:flex">
          <div className="relative h-10 w-10">
            <Image alt="SE2 logo" className="cursor-pointer" fill src="/logo.svg" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold leading-tight">Scaffold-ETH</span>
            <span className="text-xs text-muted-foreground">Ethereum dev stack</span>
          </div>
        </Link>
        <ul className="hidden gap-2 px-1 lg:flex lg:flex-nowrap">
          <HeaderMenuLinks />
        </ul>
      </div>
      <div className="flex items-center gap-2 mr-4">
        <RainbowKitCustomConnectButton />
        {isLocalNetwork && <FaucetButton />}
      </div>
    </div>
  );
} 