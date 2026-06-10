import Image from "next/image";

const IMILI_IMAGE_CYCLE = [
  "/new/humans.png",
  "/new/mision.png",
  "/new/vision.png",
  "/new/bg-hero.png",
] as const;

const communityMembers = [
  { id: 1, col: 1, position: "top" },
  { id: 2, col: 1, position: "bottom" },
  { id: 3, col: 2, position: "top" },
  { id: 4, col: 2, position: "bottom" },
  { id: 5, col: 3, position: "top", featured: true },
  { id: 6, col: 3, position: "bottom" },
  { id: 7, col: 4, position: "top" },
  { id: 8, col: 4, position: "bottom" },
  { id: 9, col: 5, position: "top" },
  { id: 10, col: 5, position: "bottom" },
].map((member, index) => ({
  ...member,
  src: IMILI_IMAGE_CYCLE[index % IMILI_IMAGE_CYCLE.length],
  alt: "IMILI community",
}));

const columnOffsets: Record<number, string> = {
  1: "translate-y-12",
  2: "translate-y-6",
  3: "translate-y-0",
  4: "translate-y-6",
  5: "translate-y-12",
};

export function CommunityGrid() {
  return (
    <div className="w-full px-4 md:px-8 lg:px-16 overflow-hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 lg:gap-6">
        {communityMembers.map((member) => (
          <div
            key={member.id}
            className={`relative ${columnOffsets[member.col]} ${
              member.featured ? "row-span-2" : ""
            }`}
          >
            <div
              className={`relative rounded-2xl overflow-hidden flex-shrink-0 ${
                member.featured ? "h-[500px]" : "h-[280px]"
              }`}
            >
              <Image
                src={member.src}
                alt={member.alt}
                fill
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommunityGrid;
