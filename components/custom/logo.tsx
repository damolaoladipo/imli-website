import Image from "next/image";

import { cn } from "@/lib/utils";

/** Mobile header height — keep in sync with `UnescoLogo`. */
export const mobileHeaderLogoClass = "h-9 w-auto";

type LogoProps = {
  className?: string;
};

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <Image
      src="/blocks/imili.svg"
      alt="IMILI logo"
      width={360}
      height={286}
      priority
      className={cn(mobileHeaderLogoClass, "lg:h-auto lg:w-56", className)}
    />
  );
};

export default Logo;
