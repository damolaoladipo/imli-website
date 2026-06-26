"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface TagFilterProps {
  tags: string[];
  selectedTag: string;
  tagCounts?: Record<string, number>;
}

export function TagFilter({ tags, selectedTag, tagCounts }: TagFilterProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleTagClick = (tag: string) => {
    const params = new URLSearchParams();
    if (tag !== "All") params.set("tag", tag);
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  if (tags.length <= 1) return null;

  const pills = (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <button
          key={tag}
          type="button"
          onClick={() => handleTagClick(tag)}
          className={cn(
            "flex h-8 cursor-pointer items-center border px-3 text-sm transition-colors",
            selectedTag === tag
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border hover:bg-muted",
          )}
        >
          <span>{tag}</span>
          {tagCounts?.[tag] !== undefined && (
            <span className="ml-2 flex h-6 min-w-6 items-center justify-center border border-border px-1 text-xs">
              {tagCounts[tag]}
            </span>
          )}
        </button>
      ))}
    </div>
  );

  return (
    <>
      <div className="hidden md:block">{pills}</div>
      <Accordion type="single" collapsible className="md:hidden">
        <AccordionItem value="tags" className="border-border">
          <AccordionTrigger className="text-sm font-medium hover:no-underline">
            Filter: {selectedTag}
          </AccordionTrigger>
          <AccordionContent>{pills}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
