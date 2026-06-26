import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { YouTube } from "@/components/mdx/youtube";

function MdxImage(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const { src, alt = "" } = props;
  if (!src || typeof src !== "string") return null;
  return (
    <span className="my-8 block overflow-hidden rounded-lg">
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={675}
        className="h-auto w-full"
        sizes="(max-width: 768px) 100vw, 768px"
      />
    </span>
  );
}

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    img: MdxImage,
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
    YouTube,
    ...components,
  };
}

export const useMDXComponents = getMDXComponents;
