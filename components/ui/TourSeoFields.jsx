"use client";

import { slugify } from "@/lib/slug";

const META_TITLE_MAX = 60;
const META_DESC_MAX = 160;

// SEO block shared by the add/edit tour admin forms. All fields optional:
// blank slug -> derived from title, blank meta -> derived from tour details.
export default function TourSeoFields({ title, slug, metaTitle, metaDescription, onChange }) {
    const effectiveSlug = slugify(slug) || slugify(title);

    // Normalise the slug when the field loses focus, so what's saved is what's previewed.
    const handleSlugBlur = (e) => {
        onChange({ target: { name: "slug", value: slugify(e.target.value) } });
    };

    const counterClass = (len, max) =>
        `text-xs ${len > max ? "text-red-600" : "text-gray-400"}`;

    return (
        <fieldset className="rounded-lg border border-gray-300 p-4 space-y-4">
            <legend className="px-2 font-semibold text-sm md:text-base">SEO</legend>

            <div className="space-y-1">
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                    URL Slug
                    <span className="text-gray-400 text-xs ml-2 font-normal">
                        (Leave blank to generate from title)
                    </span>
                </label>
                <input
                    type="text"
                    id="slug"
                    name="slug"
                    value={slug || ""}
                    onChange={onChange}
                    onBlur={handleSlugBlur}
                    placeholder={slugify(title) || "e.g. kedarkantha-trek"}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-xs text-gray-500 break-all">
                    traveltoedge.com/tours/<span className="font-medium text-gray-700">{effectiveSlug || "…"}</span>
                </p>
            </div>

            <div className="space-y-1">
                <div className="flex items-center justify-between">
                    <label htmlFor="metaTitle" className="block text-sm font-medium text-gray-700">
                        Meta Title
                    </label>
                    <span className={counterClass((metaTitle || "").length, META_TITLE_MAX)}>
                        {(metaTitle || "").length}/{META_TITLE_MAX}
                    </span>
                </div>
                <input
                    type="text"
                    id="metaTitle"
                    name="metaTitle"
                    value={metaTitle || ""}
                    onChange={onChange}
                    placeholder={title ? `${title} | Travel To Edge` : "Shown in browser tab and Google results"}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div className="space-y-1">
                <div className="flex items-center justify-between">
                    <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700">
                        Meta Description
                    </label>
                    <span className={counterClass((metaDescription || "").length, META_DESC_MAX)}>
                        {(metaDescription || "").length}/{META_DESC_MAX}
                    </span>
                </div>
                <textarea
                    id="metaDescription"
                    name="metaDescription"
                    value={metaDescription || ""}
                    onChange={onChange}
                    rows={3}
                    placeholder="Short summary shown under the title in Google results"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
        </fieldset>
    );
}
