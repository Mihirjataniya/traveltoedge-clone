import connectToDatabase from "@/lib/db";
import TourPackage from "@/models/tourPackage";
import Blog from "@/models/blog";
import { SITE_URL } from "@/lib/site";
import { tourPath, blogPath } from "@/lib/slug";

// Rebuilt at most hourly so new tours/blogs show up without a redeploy.
export const revalidate = 3600;

const STATIC_ROUTES = [
  { path: "", priority: 1.0, changeFrequency: "daily" },
  { path: "/tours", priority: 0.9, changeFrequency: "daily" },
  { path: "/blogs", priority: 0.8, changeFrequency: "weekly" },
  { path: "/about-us", priority: 0.5, changeFrequency: "monthly" },
  { path: "/contact-us", priority: 0.6, changeFrequency: "monthly" },
  { path: "/faqs", priority: 0.5, changeFrequency: "monthly" },
  { path: "/policies", priority: 0.2, changeFrequency: "yearly" },
];

export default async function sitemap() {
  const entries = STATIC_ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency,
    priority,
  }));

  try {
    await connectToDatabase();
    const [tours, blogs] = await Promise.all([
      // Only tours with content have a detail page; the rest link to a PDF.
      TourPackage.find({ content: { $nin: [null, ""] } })
        .select("title slug updatedAt")
        .lean(),
      Blog.find({}).select("title slug date updatedAt").lean(),
    ]);

    for (const tour of tours) {
      entries.push({
        url: `${SITE_URL}${tourPath(tour)}`,
        lastModified: tour.updatedAt,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
    for (const blog of blogs) {
      entries.push({
        url: `${SITE_URL}${blogPath(blog)}`,
        lastModified: blog.updatedAt || blog.date,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  } catch (err) {
    // Still serve the static routes if the DB is unreachable.
    console.error("Error building sitemap:", err);
  }

  // Tours/blogs sharing a title resolve to the same URL; list each URL once.
  const seen = new Set();
  return entries.filter((e) => !seen.has(e.url) && seen.add(e.url));
}
