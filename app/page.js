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
      <Page1 initialImage={randomHeroIndex()} />
      <Page2 />
      <Page3 />
      <Page4 />
    </div>
  );
}
