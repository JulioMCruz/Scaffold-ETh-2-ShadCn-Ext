import Blockies from "react-blockies";

type BlockieAvatarProps = {
  address: string;
  size?: number;
  ensImage?: string;
  className?: string;
};

/**
 * Shows a blockie image for the provided wallet address
 */
export function BlockieAvatar({ address, size = 24, ensImage, className }: BlockieAvatarProps) {
  if (!address) return null;

  return ensImage ? (
    // eslint-disable-next-line
    <img className={className} src={ensImage} width={size} height={size} alt={`${address} avatar`} />
  ) : (
    <Blockies
      className={className}
      seed={address.toLowerCase()}
      scale={size * 0.125}
      size={8}
    />
  );
} 