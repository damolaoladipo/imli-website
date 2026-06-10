"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { CustomButton } from "@/components/custom/custom-button";

interface Feature1Props {
  title?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  buttonPrimary?: {
    text: string;
    href: string;
  };
  buttonSecondary?: {
    text: string;
    href: string;
  };
  className?: string;
}

const AboutUs = ({
  title = "Blocks built with Shadcn & Tailwind",
  description = "Hundreds of finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.",
  imageSrc = "/new/mision.png",
  imageAlt = "IMILI observatory",
  buttonPrimary = {
    text: "Learn More",
    href: "/about",
  },
  buttonSecondary = {
    text: "Learn More",
    href: "https://shadcnblocks.com",
  },
  className,
}: Feature1Props) => {
  return (
    <section
      className={cn(
        "bg-green-100 px-4 py-12 sm:px-6 md:py-20 lg:py-32",
        className,
      )}
    >
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-start text-left">
            <h2 className="my-6 mt-0 text-2xl font-semibold text-balance sm:text-3xl md:text-4xl lg:text-5xl">
              {title}
            </h2>
            {description && (
              <p className="mb-8 max-w-xl text-base text-muted-foreground lg:text-lg">
                {description}
              </p>
            )}
            <div className="flex flex-col justify-start gap-2 sm:flex-row">
              <CustomButton href={buttonPrimary.href}>
                {buttonPrimary.text}
              </CustomButton>
            </div>
          </div>
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={400}
            height={400}
            className="max-h-80 w-full rounded-md object-cover lg:max-h-96"
          />
        </div>
      </div>
    </section>
  );
};

export { AboutUs };
