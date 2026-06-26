import Image from "next/image";

import { STOCK_IMAGES } from "@/_data/imili/images";

type CommunityMember = {
  id: number;
  col: number;
  position: "top" | "bottom";
  featured?: boolean;
};

const communityMembers: CommunityMember[] = [
  { id: 1, col: 1, position: "top" },
  { id: 2, col: 1, position: "bottom" },
  { id: 3, col: 2, position: "top" },
  { id: 4, col: 2, position: "bottom" },
  { id: 5, col: 3, position: "top", featured: true },
  { id: 6, col: 3, position: "bottom" },
];

export function CommunityGrid() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-3 gap-4 px-6">
        {communityMembers.map((member, index) => {
          const image = STOCK_IMAGES.community[index];
          return (
            <div
              key={member.id}
              className={`relative overflow-hidden rounded-2xl ${
                member.featured ? "row-span-2 h-full min-h-[420px]" : "h-52"
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes={member.featured ? "33vw" : "25vw"}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
