// Slug helpers for tour detail pages.
// slugify: "KEDARKANTHA TREK" -> "kedarkantha-trek", "Jibhi & Tirthan" -> "jibhi-tirthan"
export function slugify(str) {
  return String(str || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-") // any run of non-alphanumerics -> single hyphen
    .replace(/^-+|-+$/g, ""); // trim leading/trailing hyphens
}

// Build a case-insensitive, separator-tolerant regex to match the original title
// from a slug. e.g. "jibhi-tirthan" -> /^jibhi[^a-z0-9]+tirthan$/i
// This recovers titles even though slugify lowercased them and stripped specials.
export function slugToTitleRegex(slug) {
  const parts = String(slug || "")
    .split("-")
    .filter(Boolean)
    .map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")); // escape regex metachars
  if (!parts.length) return null;
  return new RegExp(`^${parts.join("[^a-zA-Z0-9]+")}$`, "i");
}

// Public detail-page path for a tour: custom slug set in admin wins, else derived from title.
export function tourPath(tour) {
  return `/tours/${tour.slug || slugify(tour.title)}`;
}

// Public detail-page path for a blog: custom slug wins, else the legacy "Title_With_Underscores".
// The legacy segment can contain "?", "&" etc., so it's percent-encoded.
export function blogPath(blog) {
  if (blog.slug) return `/blogs/${blog.slug}`;
  return `/blogs/${encodeURIComponent(legacyBlogSegment(blog.title))}`;
}

export function legacyBlogSegment(title) {
  return String(title || "").trim().replace(/\s+/g, "_");
}

// Route params may or may not arrive percent-encoded; decode defensively.
export function safeDecode(str) {
  try {
    return decodeURIComponent(str);
  } catch {
    return str;
  }
}
