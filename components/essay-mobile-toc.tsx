"use client";

import { List } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TableOfContents } from "@/components/table-of-contents";

export function EssayMobileToc() {
  return (
    <div className="fixed bottom-6 right-6 z-40 lg:hidden">
      <Accordion type="single" collapsible className="w-[min(100vw-3rem,20rem)] rounded-lg border border-border bg-background shadow-lg">
        <AccordionItem value="toc" className="border-0">
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <span className="flex items-center gap-2 text-sm font-medium">
              <List className="h-4 w-4" aria-hidden />
              Table of contents
            </span>
          </AccordionTrigger>
          <AccordionContent className="max-h-64 overflow-y-auto px-4 pb-4">
            <TableOfContents refreshDelay={300} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
