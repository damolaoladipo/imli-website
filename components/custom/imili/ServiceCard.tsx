import Image from "next/image";
import Link from "next/link";
import type { ServiceCardItem } from "@/_data/imili/services";

type ServiceCardProps = {
  item: ServiceCardItem;
};

export function ServiceCard({ item }: ServiceCardProps) {
  return (
    <article className="flex min-h-[394px] w-full flex-col overflow-hidden rounded-[22px] bg-[#FAF7F2] p-7 lg:shrink-0">
      <div className="flex flex-1 flex-col">
        <div className="flex size-12 items-center justify-center rounded-xl bg-white">
          <Image
            src={item.iconSrc}
            alt={item.iconAlt}
            width={45}
            height={45}
            className="size-11"
          />
        </div>

        <h3 className="mt-4 text-[22px] font-bold text-[#111111]">{item.title}</h3>
        <p className="mt-3 max-w-[90%] text-[18px] leading-relaxed text-[#6B7280]">
          {item.description}
        </p>

        <Link
          href={item.href}
          className="mt-5 inline-flex w-fit rounded-full border border-[#D1D5DB] bg-white px-5 py-2 text-[17px] text-[#111111] transition-opacity hover:opacity-90"
        >
          {item.ctaLabel}
        </Link>
      </div>

      <div
        className="relative mt-10 h-[140px] w-full shrink-0"
        aria-hidden
      >
        <Image
          src={item.illustrationSrc}
          alt=""
          fill
          className="object-contain object-bottom brightness-0 opacity-20"
          sizes="382px"
        />
      </div>
    </article>
  );
}
