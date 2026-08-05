"use client";

import { useState } from "react";
import { Check, Link2, Share2 } from "lucide-react";
import { CustomButton } from "@/components/custom/custom-button";
import {
  customButtonCircleClassName,
  customButtonIconClassName,
  customButtonVariantStyles,
} from "@/components/custom/custom-button-styles";
import { cn } from "@/lib/utils";

type NewsletterShareButtonProps = {
  url: string;
  title: string;
  text: string;
};

function OutlineCircleIcon({ children }: { children: React.ReactNode }) {
  return (
    <span
      className={cn(
        customButtonCircleClassName,
        customButtonVariantStyles.outline.circle,
      )}
      aria-hidden
    >
      {children}
    </span>
  );
}

export function NewsletterShareButton({
  url,
  title,
  text,
}: NewsletterShareButtonProps) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  async function handleShare() {
    if (
      typeof navigator !== "undefined" &&
      typeof navigator.share === "function"
    ) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch {
        /* user cancelled or share failed — fall through to copy */
      }
    }
    await copyLink();
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <CustomButton
        type="button"
        variant="outline"
        onClick={handleShare}
        icon={
          <OutlineCircleIcon>
            <Share2 className={customButtonIconClassName} strokeWidth={2} />
          </OutlineCircleIcon>
        }
      >
        Share Newsletter
      </CustomButton>
      <CustomButton
        type="button"
        variant="outline"
        onClick={copyLink}
        icon={
          <OutlineCircleIcon>
            {copied ? (
              <Check className={customButtonIconClassName} strokeWidth={2} />
            ) : (
              <Link2 className={customButtonIconClassName} strokeWidth={2} />
            )}
          </OutlineCircleIcon>
        }
      >
        {copied ? "Link copied" : "Copy Link"}
      </CustomButton>
    </div>
  );
}
