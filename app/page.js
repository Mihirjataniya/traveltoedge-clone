import HeroParallax from "@/components/HeroParallax";
import Page1 from "@/components/Page1/Page1";
import Page2 from "@/components/Page2/Page2";
import Page3 from "@/components/Page3/Page3";
import Page4 from "@/components/Page4/Page4";
import { randomHeroIndex } from "@/components/Page1/heroImages";

export const metadata = {
  title: "Travel To Edge | Explore the World",
  description: "Discover the best travel packages and destinations. Join us for unforgettable adventures!",
};

// The hero image is picked per request, so the page cannot be prerendered once
// at build time and reused.
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="pt-20">
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
