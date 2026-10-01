import JsonLd from "@/components/JsonLd";
import { faqsData } from "./faqsData";

export const metadata = {
  title: "FAQs",
  description:
    "Answers to common questions about booking trips, payments, visas, safety and customised itineraries with Travel To Edge.",
  alternates: { canonical: "/faqs" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: Object.values(faqsData)
    .flat()
    .map(({ q, a }) => ({
      "@type": "Question",
      name: q.trim(),
      acceptedAnswer: { "@type": "Answer", text: a.trim() },
    })),
};

export default function FaqsLayout({ children }) {
  return (
    <>
      <JsonLd data={faqSchema} />
      {children}
    </>
  );
}
