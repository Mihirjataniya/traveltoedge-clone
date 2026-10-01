import HeroParallax from "@/components/HeroParallax";
import Page1 from "@/components/Page1/Page1";
import Page2 from "@/components/Page2/Page2";
import Page3 from "@/components/Page3/Page3";
import Page4 from "@/components/Page4/Page4";
import { randomHeroIndex } from "@/components/Page1/heroImages";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, DEFAULT_OG_IMAGE, SITE_EMAIL, SOCIAL_LINKS } from "@/lib/site";

export const metadata = {
  title: { absolute: "Travel To Edge | Explore the World" },
  description: "Discover the best travel packages and destinations. Join us for unforgettable adventures!",
  alternates: { canonical: "/" },
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.png`,
    image: DEFAULT_OG_IMAGE,
    description: SITE_DESCRIPTION,
    email: SITE_EMAIL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Vasant Kunj, New Delhi",
      postalCode: "110070",
      addressRegion: "Delhi",
      addressCountry: "IN",
    },
    sameAs: SOCIAL_LINKS,
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { "@id": `${SITE_URL}/#organization` },
  },
];

// The hero image is picked per request, so the page cannot be prerendered once
// at build time and reused.
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="pt-20">
      <JsonLd data={structuredData} />
      <HeroParallax>
        <Page1 initialImage={randomHeroIndex()} />
      </HeroParallax>

      {/* Opaque and above the hero: this is what does the covering. It scrolls at
          full speed while the hero is held back, so it rises over it. Without a
          background the hero shows through. */}
      <div className="relative z-10 bg-white">
        <Page2 />
        <Page3 />
        <Page4 />
      </div>
    </div>
  );
}
