import { create } from "zustand";
import scaffoldConfig from "../../../scaffold.config";
import { ChainWithAttributes } from "../../utils/scaffold-eth";

type GlobalState = {
  targetNetwork: ChainWithAttributes;
  setTargetNetwork: (network: ChainWithAttributes) => void;
};

export const useGlobalState = create<GlobalState>((set) => ({
  targetNetwork: scaffoldConfig.targetNetworks[0],
  setTargetNetwork: (network) => set({ targetNetwork: network }),
})); 