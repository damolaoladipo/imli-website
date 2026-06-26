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
];
