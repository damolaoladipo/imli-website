export type ServiceCardItem = {
  id: string;
  href: string;
  iconSrc: string;
  iconAlt: string;
  title: string;
  description: string;
  ctaLabel: string;
  illustrationSrc: string;
  illustrationAlt: string;
};

export type ServicesSectionContent = {
  badge: string;
  headingPrefix: string;
  headingAccent: string;
  items: ServiceCardItem[];
};

export const servicesReferenceContent: ServicesSectionContent = {
  badge: "OUR SERVICES",
  headingPrefix: "Clean mobility & supply chain ",
  headingAccent: "services",
  items: [
    {
      id: "ref-1",
      href: "#",
      iconSrc: "/services/icon-freight.svg",
      iconAlt: "Freight container icon",
      title: "Green freight solution",
      description:
        "Our Green Freight Solution is designed to help businesses minimize their environmental.",
      ctaLabel: "View detail",
      illustrationSrc: "/services/art-truck.svg",
      illustrationAlt: "Truck line art",
    },
    {
      id: "ref-2",
      href: "#",
      iconSrc: "/services/icon-route.svg",
      iconAlt: "Route optimization icon",
      title: "Intelligent route optimization",
      description:
        "Cut down on miles and emissions through data-driven route optimization.",
      ctaLabel: "View detail",
      illustrationSrc: "/services/art-van.svg",
      illustrationAlt: "Delivery van line art",
    },
    {
      id: "ref-3",
      href: "#",
      iconSrc: "/services/icon-fleet.svg",
      iconAlt: "Fleet management icon",
      title: "Fleet management",
      description:
        "Eco-focused fleet operations for better sustainability control.",
      ctaLabel: "View detail",
      illustrationSrc: "/services/art-ship.svg",
      illustrationAlt: "Cargo ship line art",
    },
  ],
};
