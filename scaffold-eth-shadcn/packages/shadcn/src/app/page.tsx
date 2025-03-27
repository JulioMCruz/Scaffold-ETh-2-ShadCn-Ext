"use client";

import { Balance } from "@/components/scaffold-eth";

export default function Home() {
  return (
    <div className="flex items-center flex-col flex-grow pt-10">
      <div className="px-5">
        <h1 className="text-center mb-8">
          <span className="block text-2xl mb-2">Welcome to</span>
          <span className="block text-4xl font-bold">Scaffold-ETH 2</span>
        </h1>
        <p className="text-center text-lg">
          Get started by editing{" "}
          <code className="italic bg-base-300 text-base font-bold">packages/nextjs/app/page.tsx</code>
        </p>
        <div className="flex justify-center mt-8">
          <Balance address="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" />
        </div>
      </div>
    </div>
  );
}
