"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

const buttonStyles =
  "inline-flex items-center gap-2 rounded-full bg-[#0548bd] px-6 py-3.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-[#5ce43a] focus-visible:bg-[#5ce43a] disabled:pointer-events-none disabled:opacity-50 sm:px-8 sm:py-4 sm:text-base";

const spring = { type: "spring" as const, stiffness: 420, damping: 30 };

const buttonVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
};

type CustomButtonBaseProps = {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
};

type CustomButtonAsLink = CustomButtonBaseProps &
  Omit<React.ComponentPropsWithoutRef<typeof Link>, "children"> & {
    href: string;
  };

type CustomButtonAsButton = CustomButtonBaseProps &
  Omit<React.ComponentPropsWithoutRef<"button">, "children"> & {
    href?: undefined;
  };

type CustomButtonProps = CustomButtonAsLink | CustomButtonAsButton;

export function CustomButton({
  children,
  href,
  className,
  icon,
  fullWidth = false,
  disabled,
  ...props
}: CustomButtonProps) {
  const interactionProps = disabled
    ? {}
    : {
        initial: "rest" as const,
        animate: "rest" as const,
        whileHover: "hover" as const,
        whileTap: "tap" as const,
      };

  const content = (
    <span
      className={cn(
        buttonStyles,
        fullWidth && "w-full justify-center",
        className,
      )}
    >
      {children}
      {icon === undefined ? (
        <ArrowRight className="size-5 shrink-0 sm:size-6" strokeWidth={1.75} />
      ) : (
        icon
      )}
    </span>
  );

  if (href) {
    const linkProps = props as Omit<
      React.ComponentPropsWithoutRef<typeof Link>,
      "href" | "children"
    >;

    return (
      <motion.div
        className={cn("inline-flex", fullWidth && "w-full", disabled && "pointer-events-none")}
        variants={buttonVariants}
        transition={spring}
        {...interactionProps}
      >
        <Link href={href} className="inline-flex outline-none focus-visible:ring-2 focus-visible:ring-[#0548bd]/40 focus-visible:ring-offset-2" {...linkProps}>
          {content}
        </Link>
      </motion.div>
    );
  }

  const { type = "button", ...buttonProps } = props as CustomButtonAsButton;

  return (
    <motion.div
      className={cn("inline-flex", fullWidth && "w-full", disabled && "pointer-events-none")}
      variants={buttonVariants}
      transition={spring}
      {...interactionProps}
    >
      <button
        type={type}
        disabled={disabled}
        className="inline-flex outline-none focus-visible:ring-2 focus-visible:ring-[#0548bd]/40 focus-visible:ring-offset-2"
        {...buttonProps}
      >
        {content}
      </button>
    </motion.div>
  );
}

export default CustomButton;
