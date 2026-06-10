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

/** IMILI homepage testimonials */
export const testimonialsHomepageContent: TestimonialsSectionContent = {
  badge: "Trusted by stakeholders",
  headingLine1: "Trusted by media",
  headingLine2: "and literacy leaders",
  items: [
    {
      id: "george-obinna",
      variant: "standard",
      quote:
        "IMILI's reports have transformed the way I approach media content. Their comprehensive and accessible format makes complex information easy to digest and apply.",
      name: "George Obinna",
      location: "Media Analyst",
      avatarSrc: IMILI_IMAGES.humans.src,
      avatarAlt: IMILI_IMAGES.humans.alt,
    },
    {
      id: "wale-akande",
      variant: "standard",
      quote:
        "The reports from IMILI have significantly broadened my understanding of media literacy. They are a vital resource for anyone looking to deepen their knowledge in this field.",
      name: "Wale Akande",
      location: "Media Professional",
      avatarSrc: IMILI_IMAGES.mission.src,
      avatarAlt: IMILI_IMAGES.mission.alt,
    },
    {
      id: "aisha-abba",
      variant: "featured",
      quote:
        "As a journalist, staying informed is crucial. The insights provided by these reports have been invaluable in my work.",
      name: "Aisha Abba",
      location: "Investigative Journalist",
      photoSrc: IMILI_IMAGES.vision.src,
      photoAlt: IMILI_IMAGES.vision.alt,
    },
    {
      id: "mohammed-idris",
      variant: "standard",
      quote:
        "IMILI comes at a pivotal moment for the global community, as we confront misinformation, disinformation, and hate speech.",
      name: "Mohammed Idris",
      location: "Minister of Information",
      avatarSrc: IMILI_IMAGES.bgHero.src,
      avatarAlt: IMILI_IMAGES.bgHero.alt,
    },
    {
      id: "sharon-omotosho",
      variant: "standard",
      quote:
        "IMILI is set to provide training, advocacy support, research, and policy support across sectors addressing digital challenges.",
      name: "Dr. Sharon Omotosho",
      location: "Director of IMILI",
      avatarSrc: IMILI_IMAGES.humans.src,
      avatarAlt: IMILI_IMAGES.humans.alt,
    },
    {
      id: "hajo-sani",
      variant: "standard",
      quote:
        "With the launch of IMILI, Nigeria has demonstrated to the world its capacity to advance media and information literacy.",
      name: "Dr. Hajo Sani",
      location: "Nigeria's Rep. to UNESCO",
      avatarSrc: IMILI_IMAGES.mission.src,
      avatarAlt: IMILI_IMAGES.mission.alt,
    },
  ],
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
