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
