// Server-only helpers for resolving tours by URL slug (custom or title-derived).
import TourPackage from "@/models/tourPackage";
import { slugify, slugToTitleRegex } from "@/lib/slug";

// Custom slug wins; tours without one are matched by title (legacy behaviour).
export async function findTourBySlug(slug) {
  const clean = slugify(slug);
  if (!clean) return null;
  const bySlug = await TourPackage.findOne({ slug: clean });
  if (bySlug) return bySlug;
  const titleRegex = slugToTitleRegex(clean);
  if (!titleRegex) return null;
  return TourPackage.findOne({
    title: titleRegex,
    $or: [{ slug: { $exists: false } }, { slug: null }, { slug: "" }],
  });
}

// Pull the SEO fields out of a request body. Blank slug -> null (falls back to title).
export function readSeoFields(body) {
  return {
    slug: slugify(body.slug) || null,
    metaTitle: String(body.metaTitle || "").trim(),
    metaDescription: String(body.metaDescription || "").trim(),
  };
}

// True if `slug` already resolves to a different tour (custom slug or title-derived).
export async function isSlugTaken(slug, excludeId) {
  const titleRegex = slugToTitleRegex(slug);
  const or = [{ slug }];
  if (titleRegex) {
    or.push({
      title: titleRegex,
      $or: [{ slug: { $exists: false } }, { slug: null }, { slug: "" }],
    });
  }
  const filter = { $or: or };
  if (excludeId) filter._id = { $ne: excludeId };
  return Boolean(await TourPackage.exists(filter));
}
