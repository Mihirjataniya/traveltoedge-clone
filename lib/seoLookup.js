// Server-only helpers for resolving tours/blogs by URL slug and saving SEO fields.
import TourPackage from "@/models/tourPackage";
import Blog from "@/models/blog";
import { slugify, slugToTitleRegex, safeDecode } from "@/lib/slug";

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Docs without a custom slug sort first, so a title match prefers the tour/blog
// whose URL is actually title-derived.
const NO_SLUG_FIRST = { slug: 1 };

// Resolve a tour from a URL segment: custom slug, then title-derived slug, then a
// former slug. The caller redirects to tourPath(tour) when the segment isn't canonical.
export async function findTourBySlug(segment) {
  const clean = slugify(safeDecode(segment));
  if (!clean) return null;
  return (
    (await TourPackage.findOne({ slug: clean }).lean()) ||
    (await TourPackage.findOne({ title: slugToTitleRegex(clean) }).sort(NO_SLUG_FIRST).lean()) ||
    (await TourPackage.findOne({ previousSlugs: clean }).lean())
  );
}

// Same for blogs; legacy blog URLs are "Title_With_Underscores".
export async function findBlogBySlug(segment) {
  const decoded = safeDecode(segment).trim();
  const clean = slugify(decoded);
  if (!decoded) return null;
  const title = decoded.replace(/_/g, " ");
  return (
    (clean && (await Blog.findOne({ slug: clean }).lean())) ||
    (await Blog.findOne({ title: new RegExp(`^${escapeRegex(title)}$`, "i") }).sort(NO_SLUG_FIRST).lean()) ||
    (clean && (await Blog.findOne({ previousSlugs: clean }).lean())) ||
    null
  );
}

// Pull the SEO fields out of a request body. Blank slug -> null (falls back to title).
export function readSeoFields(body) {
  return {
    slug: slugify(body.slug) || null,
    metaTitle: String(body.metaTitle || "").trim(),
    metaDescription: String(body.metaDescription || "").trim(),
    // "a, b ,, c" -> "a, b, c"
    metaKeywords: String(body.metaKeywords || "")
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean)
      .join(", "),
    imageAlt: String(body.imageAlt || "").trim(),
  };
}

// True if `slug` already resolves to a different doc (custom slug or title-derived).
async function slugTakenIn(Model, slug, excludeId) {
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
  return Boolean(await Model.exists(filter));
}

export const isSlugTaken = (slug, excludeId) => slugTakenIn(TourPackage, slug, excludeId);
export const isBlogSlugTaken = (slug, excludeId) => slugTakenIn(Blog, slug, excludeId);

// When a doc's URL changes, remember the old slug so it can 301 to the new one.
// Slugs are compared in slugified form (legacy blog URLs included).
export function nextPreviousSlugs(existing, newSlug, newTitle) {
  const oldKey = existing.slug || slugify(existing.title);
  const newKey = newSlug || slugify(newTitle);
  const list = (existing.previousSlugs || []).filter((s) => s && s !== newKey);
  if (oldKey && oldKey !== newKey && !list.includes(oldKey)) list.push(oldKey);
  return list;
}
