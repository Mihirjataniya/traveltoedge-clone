import connectToDatabase from "@/lib/db";
import { findTourBySlug } from "@/lib/tourLookup";
import { tourPath } from "@/lib/slug";

const BASE_URL = "https://traveltoedge.com";

// Page is a client component, so SEO tags come from this server layout.
// Admin-set metaTitle / metaDescription win; otherwise derive from the tour.
export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    await connectToDatabase();
    const tour = await findTourBySlug(slug);
    if (!tour) return { title: "Tour not found | Travel To Edge" };

    const title = tour.metaTitle || `${tour.title} | Travel To Edge`;
    const description =
      tour.metaDescription ||
      `${tour.title} – ${tour.duration} tour in ${tour.location}, starting from ₹${tour.price}. Book with Travel To Edge.`;
    const url = `${BASE_URL}${tourPath(tour)}`;
    const image = tour.coverImages?.[0] || tour.coverImage || tour.image;

    return {
      title,
      description,
      ...(tour.metaKeywords && { keywords: tour.metaKeywords.split(",").map((k) => k.trim()).filter(Boolean) }),
      alternates: { canonical: url },
      openGraph: { title, description, url, images: image ? [image] : [] },
    };
  } catch (err) {
    console.error("Error building tour metadata:", err);
    return {};
  }
}

export default function TourLayout({ children }) {
  return children;
}
