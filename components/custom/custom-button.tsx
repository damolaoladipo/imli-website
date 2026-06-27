"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

import {
  arrowCircleButtonClassName,
  customButtonBaseClassName,
  customButtonCircleClassName,
  customButtonIconClassName,
  customButtonVariantStyles,
  type CustomButtonVariant,
} from "@/components/custom/custom-button-styles";

export {
  arrowCircleButtonClassName,
  customButtonIconClassName,
  type CustomButtonVariant,
};

const spring = { type: "spring" as const, stiffness: 420, damping: 30 };

const buttonVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
};

const arrowCircleVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.08 },
  tap: { scale: 0.94 },
};

const arrowIconVariants = {
  rest: { x: 0, rotate: 0 },
  hover: { x: 0, rotate: -45 },
  tap: { x: 0, rotate: -45 },
};

type CustomButtonBaseProps = {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  variant?: CustomButtonVariant;
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

function CustomButtonArrow({ variant }: { variant: CustomButtonVariant }) {
  const styles = customButtonVariantStyles[variant];

  return (
    <motion.span
      className={cn(customButtonCircleClassName, styles.circle)}
      variants={arrowCircleVariants}
      transition={spring}
      aria-hidden
    >
      <motion.span
        className="flex items-center justify-center"
        variants={arrowIconVariants}
        transition={spring}
      >
        <ArrowRight className={customButtonIconClassName} strokeWidth={2} />
      </motion.span>
    </motion.span>
  );
}

export function CustomButton({
  children,
  href,
  className,
  icon,
  variant = "primary",
  fullWidth = false,
  disabled,
  ...props
}: CustomButtonProps) {
  const styles = customButtonVariantStyles[variant];
  const interactionProps = disabled
    ? {}
    : {
        initial: "rest" as const,
        animate: "rest" as const,
        whileHover: "hover" as const,
        whileTap: "tap" as const,
      };

  const focusClassName = cn(
    "inline-flex outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    styles.focusRing,
  );

  const content = (
    <span
      className={cn(
        customButtonBaseClassName,
        styles.button,
        fullWidth && "w-full",
        fullWidth && icon === undefined && "justify-between",
        fullWidth && icon === null && "justify-center px-8",
        className,
      )}
    >
      {icon === null ? (
        children
      ) : (
        <>
          <span>{children}</span>
          {icon === undefined ? (
            <CustomButtonArrow variant={variant} />
          ) : (
            icon
          )}
        </>
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
        <Link href={href} className={focusClassName} {...linkProps}>
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
        className={focusClassName}
        {...buttonProps}
      >
        {content}
      </button>
    </motion.div>
  );
}

export default CustomButton;
