/** Unique raster assets — one file per placement (see image-attributions.ts). */
export type StockImage = {
  src: string;
  alt: string;
};

const img = (file: string, alt: string): StockImage => ({
  src: `/stock/${file}`,
  alt,
});

export const STOCK_IMAGES = {
  home: {
    photoHero: img(
      "home-photo-hero.jpg",
      "Modern institute lobby and conference space",
    ),
    about: img(
      "home-about.jpg",
      "Team collaborating on media literacy initiatives",
    ),
  },
  articles: {
    unescoAbuja: img(
      "article-unesco-abuja.jpg",
      "International education conference audience",
    ),
    ariseTv: img("article-arise-tv.jpg", "Broadcast studio and news production"),
    fmino: img(
      "article-fmino.jpg",
      "Government officials at an institute launch",
    ),
    tvcNews: img(
      "article-tvc-news.jpg",
      "Press briefing on media literacy milestone",
    ),
    unescoPolicy: img(
      "article-unesco-policy.jpg",
      "Policy documents and research materials",
    ),
  },
  testimonials: {
    georgeObinna: img("testimonial-george-obinna.jpg", "George Obinna"),
    waleAkande: img("testimonial-wale-akande.jpg", "Wale Akande"),
    aishaAbba: img(
      "testimonial-aisha-abba.jpg",
      "Aisha Abba, investigative journalist",
    ),
    mohammedIdris: img("testimonial-mohammed-idris.jpg", "Mohammed Idris"),
    sharonOmotosho: img("testimonial-sharon-omotosho.jpg", "Dr. Sharon Omotosho"),
    hajoSani: img("testimonial-hajo-sani.jpg", "Dr. Hajo Sani"),
  },
  nav: {
    about: [
      img("nav-about-1.jpg", "Library and research resources"),
      img("nav-about-2.jpg", "Community walking together outdoors"),
    ],
    whatWeDo: [
      img("nav-what-we-do-1.jpg", "Collaborative digital learning session"),
      img("nav-what-we-do-2.jpg", "Creative teamwork in a studio"),
    ],
    activities: [
      img("nav-activities-1.jpg", "Conference workshop with participants"),
      img("nav-activities-2.jpg", "Classroom learning environment"),
    ],
    resources: [
      img("nav-resources-1.jpg", "Planning and policy development"),
      img("nav-resources-2.jpg", "Student writing in a classroom"),
    ],
  },
  mentions: {
    unescoAbuja: img(
      "mention-unesco-abuja.jpg",
      "Team meeting on international cooperation",
    ),
    ariseTv: img("mention-arise-tv.jpg", "Team reviewing media content"),
    fmino: img("mention-fmino.jpg", "Group discussion at a round table"),
    unescoPolicy: img(
      "mention-unesco-policy.jpg",
      "Open book with study materials",
    ),
  },
  news: {
    tvcLaunch: img(
      "news-tvc-launch.jpg",
      "Official media launch and press conference",
    ),
  },
  essays: {
    whoIsImili: img(
      "essay-who-is-imili.jpg",
      "Students engaged in collaborative learning",
    ),
  },
  bento: {
    woman: img("bento-woman.jpg", "Professional woman in a learning setting"),
    classroom: img("bento-classroom.jpg", "Training session with participants"),
    man: img("bento-man.jpg", "Community member in discussion"),
    avatars: [
      img("bento-avatar-1.jpg", "Workshop participant"),
      img("bento-avatar-2.jpg", "Workshop participant"),
      img("bento-avatar-3.jpg", "Workshop participant"),
    ],
  },
  mission: {
    primary: img("mission-primary.jpg", "Volunteers at a community program"),
    secondary: img("mission-secondary.jpg", "Youth engagement activity"),
  },
  footer: {
    forestBackground: img(
      "forest-footer-bg.jpg",
      "City skyline at dusk",
    ),
  },
  curvedHero: img(
    "curved-hero.jpg",
    "Diverse group in a community setting",
  ),
  community: [
    img("community-1.jpg", "Community member"),
    img("community-2.jpg", "Community member"),
    img("community-3.jpg", "Community member"),
    img("community-4.jpg", "Community member"),
    img("community-5.jpg", "Community member"),
    img("community-6.jpg", "Community member"),
  ],
  og: {
    default: img("og-default.jpg", "Collaborative learning and discussion"),
  },
} as const;
