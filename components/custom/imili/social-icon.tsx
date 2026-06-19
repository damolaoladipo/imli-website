import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { TiktokLogo } from "@phosphor-icons/react";

import type { SocialPlatformId } from "@/_data/imili/social-links";
import { cn } from "@/lib/utils";

type SocialIconProps = {
  id: SocialPlatformId;
  className?: string;
};

export function SocialIcon({ id, className }: SocialIconProps) {
  const merged = cn("shrink-0", className);

  switch (id) {
    case "facebook":
      return <Facebook className={merged} aria-hidden />;
    case "instagram":
      return <Instagram className={merged} aria-hidden />;
    case "linkedin":
      return <Linkedin className={merged} aria-hidden />;
    case "twitter":
      return <Twitter className={merged} aria-hidden />;
    case "youtube":
      return <Youtube className={merged} aria-hidden />;
    case "tiktok":
      return <TiktokLogo className={merged} aria-hidden weight="regular" />;
  }
}
