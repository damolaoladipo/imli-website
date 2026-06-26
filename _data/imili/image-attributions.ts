export type ImageAttribution = {
  /** Path under public/, e.g. /stock/bg-hero.jpg */
  path: string;
  photographer: string;
  unsplashUrl: string;
  /** ISO date downloaded */
  downloadedAt: string;
};

/** Unsplash credits for committed stock photography (feat-0031). */
export const imageAttributions: ImageAttribution[] = [
  {
    path: "/stock/bg-hero.jpg",
    photographer: "Headway",
    unsplashUrl: "https://unsplash.com/photos/people-sitting-on-chair-in-front-of-projector-screen-FO7JIlwjYlU",
    downloadedAt: "2026-06-26",
  },
  {
    path: "/stock/humans.jpg",
    photographer: "Hannah Busing",
    unsplashUrl: "https://unsplash.com/photos/group-of-people-walking-on-green-grass-field-Zyx1bK9mqmA",
    downloadedAt: "2026-06-26",
  },
  {
    path: "/stock/mission.jpg",
    photographer: "Aaron Burden",
    unsplashUrl: "https://unsplash.com/photos/assorted-title-book-lot-QJDzYT_K8Xg",
    downloadedAt: "2026-06-26",
  },
  {
    path: "/stock/vision.jpg",
    photographer: "Christina @ wocintechchat.com",
    unsplashUrl: "https://unsplash.com/photos/three-person-sitting-in-front-of-monitor-while-using-laptops-SJvDxw0azqw",
    downloadedAt: "2026-06-26",
  },
  {
    path: "/stock/hero-lobby.jpg",
    photographer: "Nastuh Abootalebi",
    unsplashUrl: "https://unsplash.com/photos/photo-of-dining-table-and-chairs-inside-room-yWwJr8huEJ8",
    downloadedAt: "2026-06-26",
  },
  {
    path: "/stock/og-default.jpg",
    photographer: "Headway",
    unsplashUrl: "https://unsplash.com/photos/people-sitting-on-chair-in-front-of-projector-screen-FO7JIlwjYlU",
    downloadedAt: "2026-06-26",
  },
  {
    path: "/stock/news-tvc-launch.jpg",
    photographer: "Sebastian Pichler",
    unsplashUrl: "https://unsplash.com/photos/people-sitting-on-chair-in-front-of-table-while-holding-pens-during-daytime-gOT9hg131TQ",
    downloadedAt: "2026-06-26",
  },
  {
    path: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655",
    photographer: "National Cancer Institute",
    unsplashUrl: "https://unsplash.com/photos/people-sitting-on-chair-inside-classroom-1fb2b075b655",
    downloadedAt: "2026-06-26",
  },
  {
    path: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6",
    photographer: "Christina @ wocintechchat.com",
    unsplashUrl: "https://unsplash.com/photos/woman-standing-in-front-of-glass-wall-8YG31Xn4dSw",
    downloadedAt: "2026-06-26",
  },
  {
    path: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
    photographer: "Scott Graham",
    unsplashUrl: "https://unsplash.com/photos/person-using-laptop-computer-holding-card-c3d57bc86b40",
    downloadedAt: "2026-06-26",
  },
  {
    path: "https://images.unsplash.com/photo-1562774053-701939374585",
    photographer: "Aaron Burden",
    unsplashUrl: "https://images.unsplash.com/photo-1562774053-701939374585",
    downloadedAt: "2026-06-26",
  },
];
