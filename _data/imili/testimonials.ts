import { IMILI_IMAGES } from "./images";

export type TestimonialCardVariant = "standard" | "featured";

export type TestimonialItem = {
  id: string;
  variant: TestimonialCardVariant;
  quote: string;
  name: string;
  location: string;
  avatarSrc?: string;
  avatarAlt?: string;
  photoSrc?: string;
  photoAlt?: string;
};

export type TestimonialsSectionContent = {
  badge: string;
  headingLine1: string;
  headingLine2: string;
  items: TestimonialItem[];
};

export const testimonialsReferenceContent: TestimonialsSectionContent = {
  badge: "Trusted by customers",
  headingLine1: "Trusted by families",
  headingLine2: "and businesses alike",
  items: [
    {
      id: "ref-1",
      variant: "standard",
      quote:
        "…simple, the… ed right on time, …rked quickly… ing corners. …e all around.",
      name: "…ma L",
      location: "…ago, IL",
      avatarSrc: IMILI_IMAGES.humans.src,
      avatarAlt: IMILI_IMAGES.humans.alt,
    },
    {
      id: "ref-2",
      variant: "standard",
      quote:
        "I was worried about damage, but every piece arrived just as it left. Highly recommend! The movers were on time, courteous.",
      name: "Michael Kee",
      location: "Seattle, WA",
      avatarSrc: IMILI_IMAGES.mission.src,
      avatarAlt: IMILI_IMAGES.mission.alt,
    },
    {
      id: "ref-3",
      variant: "featured",
      quote: "Moving always feels overwhelming, but they truly made it a breeze",
      name: "Derrick Warner",
      location: "New York, NY",
      photoSrc: IMILI_IMAGES.humans.src,
      photoAlt: IMILI_IMAGES.humans.alt,
    },
    {
      id: "ref-4",
      variant: "standard",
      quote:
        "I was dreading the move, but they made it so easy. Everything arrived safely and on time. The team was respectful and helpful.",
      name: "Jessica Leo",
      location: "Austin, TX",
      avatarSrc: IMILI_IMAGES.vision.src,
      avatarAlt: IMILI_IMAGES.vision.alt,
    },
    {
      id: "ref-5",
      variant: "standard",
      quote:
        "The crew was friendly, fast, and incredibly organized. They handled our large furniture with ease and didn't leave a scratch.",
      name: "Aiden T",
      location: "Boston, MA",
      avatarSrc: IMILI_IMAGES.bgHero.src,
      avatarAlt: IMILI_IMAGES.bgHero.alt,
    },
    {
      id: "ref-6",
      variant: "standard",
      quote:
        "We had a tight schedule and lots of fragile items. They made it work effortlessly. Nothing was damaged.",
      name: "Carlos M",
      location: "Atlanta, GA",
      avatarSrc: IMILI_IMAGES.humans.src,
      avatarAlt: IMILI_IMAGES.humans.alt,
    },
  ],
};
