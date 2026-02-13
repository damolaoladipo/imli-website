"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Feature1 } from "@/components/feature1";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

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
  imageSrc = "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
  imageAlt = "placeholder hero",
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
    <section className={cn("py-32 px-4 sm:px-50  bg-green-100", className)}>
      <div className="container  ">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <h2 className="my-6 mt-0 text-4xl font-semibold text-balance lg:text-5xl">
              {title}
            </h2>
            {description && (
              <p className="mb-8 max-w-xl text-muted-foreground lg:text-lg">
                {description}
              </p>
            )}
            <div className="flex flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              <Button asChild size="lg" className="rounded-full">
                <Link
                  href={buttonPrimary.href}
                  className="group items-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] px-6 py-3 font-medium text-white transition-colors"
                >
                  {buttonPrimary.text}
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
                </Link>
              </Button>
            </div>
          </div>
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={400}
            height={400}
            className="max-h-96 w-full rounded-md object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export { AboutUs };
