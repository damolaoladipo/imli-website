/** Trailing arrow icon inside the pill button. */
export const customButtonIconClassName = "size-4 shrink-0";

/** Circular arrow control (article cards, carousel nav, etc.). */
export const arrowCircleButtonClassName =
  "flex size-11 shrink-0 items-center justify-center rounded-full";

export type CustomButtonVariant = "primary" | "outline" | "hero";

export const customButtonVariantStyles: Record<
  CustomButtonVariant,
  { button: string; circle: string; focusRing: string }
> = {
  primary: {
    button:
      "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:bg-primary/90",
    circle: "bg-primary-foreground text-primary",
    focusRing: "focus-visible:ring-primary/40",
  },
  outline: {
    button:
      "border border-primary bg-background text-primary hover:bg-primary/5",
    circle: "bg-primary text-primary-foreground",
    focusRing: "focus-visible:ring-primary/40",
  },
  hero: {
    button: "bg-background text-foreground hover:bg-muted",
    circle: "bg-primary text-primary-foreground",
    focusRing: "focus-visible:ring-primary/40",
  },
};

export const customButtonBaseClassName =
  "inline-flex h-12 items-center justify-center gap-3 rounded-full pl-6 pr-1.5 text-base font-medium leading-none transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50";

export const customButtonCircleClassName =
  "flex size-9 shrink-0 items-center justify-center rounded-full";
