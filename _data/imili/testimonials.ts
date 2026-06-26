import { STOCK_IMAGES } from "./images";

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

const { testimonials: t } = STOCK_IMAGES;

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
      avatarSrc: t.georgeObinna.src,
      avatarAlt: t.georgeObinna.alt,
    },
    {
      id: "wale-akande",
      variant: "standard",
      quote:
        "The reports from IMILI have significantly broadened my understanding of media literacy. They are a vital resource for anyone looking to deepen their knowledge in this field.",
      name: "Wale Akande",
      location: "Media Professional",
      avatarSrc: t.waleAkande.src,
      avatarAlt: t.waleAkande.alt,
    },
    {
      id: "aisha-abba",
      variant: "featured",
      quote:
        "As a journalist, staying informed is crucial. The insights provided by these reports have been invaluable in my work.",
      name: "Aisha Abba",
      location: "Investigative Journalist",
      photoSrc: t.aishaAbba.src,
      photoAlt: t.aishaAbba.alt,
    },
    {
      id: "mohammed-idris",
      variant: "standard",
      quote:
        "IMILI comes at a pivotal moment for the global community, as we confront misinformation, disinformation, and hate speech.",
      name: "Mohammed Idris",
      location: "Minister of Information",
      avatarSrc: t.mohammedIdris.src,
      avatarAlt: t.mohammedIdris.alt,
    },
    {
      id: "sharon-omotosho",
      variant: "standard",
      quote:
        "IMILI is set to provide training, advocacy support, research, and policy support across sectors addressing digital challenges.",
      name: "Dr. Sharon Omotosho",
      location: "Director of IMILI",
      avatarSrc: t.sharonOmotosho.src,
      avatarAlt: t.sharonOmotosho.alt,
    },
    {
      id: "hajo-sani",
      variant: "standard",
      quote:
        "With the launch of IMILI, Nigeria has demonstrated to the world its capacity to advance media and information literacy.",
      name: "Dr. Hajo Sani",
      location: "Nigeria's Rep. to UNESCO",
      avatarSrc: t.hajoSani.src,
      avatarAlt: t.hajoSani.alt,
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
      avatarSrc: STOCK_IMAGES.community[0].src,
      avatarAlt: STOCK_IMAGES.community[0].alt,
    },
    {
      id: "ref-2",
      variant: "standard",
      quote:
        "I was worried about damage, but every piece arrived just as it left. Highly recommend! The movers were on time, courteous.",
      name: "Michael Kee",
      location: "Seattle, WA",
      avatarSrc: STOCK_IMAGES.community[1].src,
      avatarAlt: STOCK_IMAGES.community[1].alt,
    },
    {
      id: "ref-3",
      variant: "featured",
      quote: "Moving always feels overwhelming, but they truly made it a breeze",
      name: "Derrick Warner",
      location: "New York, NY",
      photoSrc: STOCK_IMAGES.community[2].src,
      photoAlt: STOCK_IMAGES.community[2].alt,
    },
    {
      id: "ref-4",
      variant: "standard",
      quote:
        "I was dreading the move, but they made it so easy. Everything arrived safely and on time. The team was respectful and helpful.",
      name: "Jessica Leo",
      location: "Austin, TX",
      avatarSrc: STOCK_IMAGES.community[3].src,
      avatarAlt: STOCK_IMAGES.community[3].alt,
    },
    {
      id: "ref-5",
      variant: "standard",
      quote:
        "The crew was friendly, fast, and incredibly organized. They handled our large furniture with ease and didn't leave a scratch.",
      name: "Aiden T",
      location: "Boston, MA",
      avatarSrc: STOCK_IMAGES.community[4].src,
      avatarAlt: STOCK_IMAGES.community[4].alt,
    },
    {
      id: "ref-6",
      variant: "standard",
      quote:
        "We had a tight schedule and lots of fragile items. They made it work effortlessly. Nothing was damaged.",
      name: "Carlos M",
      location: "Atlanta, GA",
      avatarSrc: STOCK_IMAGES.community[5].src,
      avatarAlt: STOCK_IMAGES.community[5].alt,
    },
  ],
};
