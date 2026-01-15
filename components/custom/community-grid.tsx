import Image from "next/image"

const communityMembers = [
  // Column 1
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&crop=face",
    alt: "Community member portrait",
    col: 1,
    position: "top",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&crop=face",
    alt: "Community member portrait",
    col: 1,
    position: "bottom",
  },
  // Column 2
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face",
    alt: "Community member portrait",
    col: 2,
    position: "top",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop&crop=face",
    alt: "Community member portrait",
    col: 2,
    position: "bottom",
  },
  // Column 3 (Center - Featured)
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop&crop=face",
    alt: "Community member portrait",
    col: 3,
    position: "top",
    featured: true,
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=face",
    alt: "Community member portrait",
    col: 3,
    position: "bottom",
  },
  // Column 4
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=500&fit=crop&crop=face",
    alt: "Community member portrait",
    col: 4,
    position: "top",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop&crop=face",
    alt: "Community member portrait",
    col: 4,
    position: "bottom",
  },
  // Column 5
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop&crop=face",
    alt: "Community member portrait",
    col: 5,
    position: "top",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face",
    alt: "Community member portrait",
    col: 5,
    position: "bottom",
  },
]

const columnOffsets: Record<number, string> = {
  1: "translate-y-12",
  2: "translate-y-6",
  3: "translate-y-0",
  4: "translate-y-6",
  5: "translate-y-12",
}

export function CommunityGrid() {
  const columns = [1, 2, 3, 4, 5].map((colNum) => communityMembers.filter((m) => m.col === colNum))

  return (
    <div className="w-full px-4 md:px-8 lg:px-16 overflow-hidden">
      <div className="flex justify-center items-start gap-3 md:gap-5 lg:gap-6">
        {columns.map((colMembers, colIndex) => (
          <div key={colIndex} className={`flex flex-col gap-3 md:gap-4 ${columnOffsets[colIndex + 1]}`}>
            {colMembers.map((member) => {
              const isFeatured = member.featured
              return (
                <div
                  key={member.id}
                  className={`relative rounded-2xl overflow-hidden flex-shrink-0 ${
                    isFeatured
                      ? "w-28 h-44 md:w-40 md:h-60 lg:w-48 lg:h-72"
                      : "w-24 h-36 md:w-36 md:h-48 lg:w-44 lg:h-56"
                  }`}
                >
                  <Image src={member.src || "/placeholder.svg"} alt={member.alt} fill className="object-cover" />
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
