import { Chain } from "viem";

export interface ChainWithAttributes extends Chain {
  color: string;
  icon: string;
}

export const NETWORKS_EXTRA_DATA: Record<number, { color: string; icon: string }> = {
  // Add network colors and icons here
  1: {
    color: "#29B6AF",
    icon: "ethereum",
  },
  5: {
    color: "#FF4A8D",
    icon: "ethereum",
  },
  137: {
    color: "#8247E5",
    icon: "polygon",
  },
  // Add more networks as needed
}; 