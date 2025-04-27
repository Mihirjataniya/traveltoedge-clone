'use client'
import NewPage1 from "@/components/NewPage1/NewPage1";
import Page1 from "@/components/Page1/Page1";
import Page2 from "@/components/Page2/Page2";
import Page3 from "@/components/Page3/Page3";
import Page4 from "@/components/Page4/Page4";
import { CircularGallery, GalleryForPhone } from "@/components/ui/CircularGallery";

import Head from "next/head";

export default function Home() {
  return (
    <div className="pt-20">
      <Head>
        <title>Travel To Edge | Explore the World</title>
        <meta name="description" content="Discover the best travel packages and destinations. Join us for unforgettable adventures!" />
      </Head>
      <Page1 />
      <Page2 />
      <Page3 />
      <Page4 />
    </div>
  );
}
