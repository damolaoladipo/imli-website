import Image from "next/image";

import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
};

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <Image
      src="/blocks/imli-logo.svg"
      alt="IMILI logo"
      width={360}
      height={286}
      priority
      className={cn("h-auto w-24 sm:w-28 lg:w-56", className)}
    />
  );
};

export default Logo;
