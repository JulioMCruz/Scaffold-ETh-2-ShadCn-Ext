import { hardhat } from "viem/chains";
import { ChainWithAttributes } from "./src/utils/scaffold-eth";

const scaffoldConfig = {
  targetNetworks: [
    {
      ...hardhat,
      color: "#666666",
      icon: "hardhat",
    },
  ] as ChainWithAttributes[],
};

export default scaffoldConfig; 