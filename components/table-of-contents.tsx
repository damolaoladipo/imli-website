"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Heading {
  id: string;
  text: string;
}

interface TableOfContentsProps {
  className?: string;
  refreshDelay?: number;
}

function getHeadingsFromDOM(): Heading[] {
  const elements = document.querySelectorAll("article h2[id], main h2[id]");
  const headings: Heading[] = [];
  elements.forEach((element) => {
    if (!element.id) return;
    headings.push({
      id: element.id,
      text: element.textContent || "",
    });
  });
  return headings;
}

export function TableOfContents({
  className,
  refreshDelay = 150,
}: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    setHeadings(getHeadingsFromDOM());
  }, []);

  useEffect(() => {
    if (refreshDelay <= 0) return;
    const t = setTimeout(() => {
      const next = getHeadingsFromDOM();
      setHeadings((prev) => (next.length > 0 ? next : prev));
    }, refreshDelay);
    return () => clearTimeout(t);
  }, [refreshDelay]);

  useEffect(() => {
    const handleScroll = () => {
      const positions = headings
        .map((h) => ({
          id: h.id,
          top: document.getElementById(h.id)?.getBoundingClientRect().top ?? 0,
        }))
        .filter((h) => h.top !== 0 || document.getElementById(h.id));

      let active = positions.find((h) => h.top >= -50 && h.top <= 120);
      if (!active) {
        active = positions
          .filter((h) => h.top < -50)
          .sort((a, b) => b.top - a.top)[0];
      }
      if (active && active.id !== activeId) setActiveId(active.id);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings, activeId]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    const offset = 96;
    const top =
      element.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: "smooth" });
    window.history.pushState({}, "", `#${id}`);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <h4 className="mb-4 text-sm font-semibold text-foreground">
        On this page
      </h4>
      {headings.length === 0 ? (
        <p className="text-sm text-muted-foreground">No sections in this essay.</p>
      ) : (
        <nav>
          <ul className="space-y-2">
            {headings.map((heading) => (
              <li key={heading.id}>
                <button
                  type="button"
                  onClick={() => handleClick(heading.id)}
                  className={cn(
                    "block w-full text-left text-sm text-muted-foreground transition-colors hover:text-foreground",
                    activeId === heading.id &&
                      "font-medium text-primary underline underline-offset-4",
                  )}
                >
                  {heading.text}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
