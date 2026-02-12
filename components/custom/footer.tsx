"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Container wraps everything to align main and bottom */}
      <div className="mx-auto max-w-6xl px-6 min-h-80">
        {/* Main content */}
        <div className="py-20">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {/* Left section */}
            <div className="flex flex-col justify-between">
              <div>
                <p className="mb-4 text-sm font-medium text-gray-400">
                  AssureUs Club
                </p>
                <h2 className="text-5xl font-bold leading-tight md:text-5xl">
                  Let&apos;s start creating together
                </h2>
              </div>

              <Button asChild size="lg" className="pr-4.5 rounded-full">
                <Link
                  href="#contact"
                  className="group mt-12 inline-flex w-fit items-center gap-2  bg-[#22c55e] hover:bg-[#16a34a] px-6 py-3 font-medium text-white transition-colors"
                >
                  Join now
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
                </Link>
              </Button>
            </div>

            {/* Right section */}
            <div className="grid grid-cols-2 gap-12">
              {/* Navigation */}
              <nav className="space-y-4">
                <Link
                  href="#"
                  className="block transition-colors hover:text-gray-300"
                >
                  Home
                </Link>
                <Link
                  href="#"
                  className="block transition-colors hover:text-gray-300"
                >
                  Programs & Events
                </Link>
                <Link
                  href="#"
                  className="block transition-colors hover:text-gray-300"
                >
                  About
                </Link>
                <Link
                  href="#"
                  className="block transition-colors hover:text-gray-300"
                >
                  Impact
                </Link>
              </nav>

              {/* Social */}
              <div className="space-y-4">
                <Link
                  href="https://www.linkedin.com/company/assureus-club"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors hover:text-gray-300"
                >
                  Linkedin
                  <ArrowUpRight className="size-4" />
                </Link>

                <Link
                  href="https://www.instagram.com/assureusclub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors hover:text-gray-300"
                >
                  Instagram
                  <ArrowUpRight className="size-4" />
                </Link>

              </div>
            </div>
          </div>
        </div>

        {/* Bottom content */}
        <div className="border-t border-neutral-800 py-8 mt-20">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row">
            <p className="text-sm text-neutral-500">Made with ❤️ by Damola</p>

            <p className="text-sm text-neutral-500">
              © {new Date().getFullYear()}{" "}
              <a
                href="https://github.com/damolaoladipo"
                className="text-neutral-400 transition-colors hover:text-[#a3f443]"
              >
                Assure Us Club
              </a>
              . All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
