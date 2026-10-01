"use client";

import { slugify } from "@/lib/slug";

const META_TITLE_MAX = 60;
const META_DESC_MAX = 160;

const inputClass =
    "w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500";

// SEO block shared by the tour and blog admin forms. All fields optional:
// blank slug -> `fallbackSlug` (derived from title), blank meta -> derived from content.
// `values` holds slug / metaTitle / metaDescription / metaKeywords / imageAlt.
export default function SeoFields({ title, values, onChange, pathPrefix, fallbackSlug }) {
    const { slug, metaTitle, metaDescription, metaKeywords, imageAlt } = values;
    const effectiveSlug = slugify(slug) || fallbackSlug;

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
                        (Leave blank to generate from title. Old URLs redirect automatically when changed.)
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
                    className={inputClass}
                />
                <p className="text-xs text-gray-500 break-all">
                    traveltoedge.com{pathPrefix}<span className="font-medium text-gray-700">{effectiveSlug || "…"}</span>
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
                    className={inputClass}
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
                    className={inputClass}
                />
            </div>

            <div className="space-y-1">
                <label htmlFor="metaKeywords" className="block text-sm font-medium text-gray-700">
                    Meta Keywords
                    <span className="text-gray-400 text-xs ml-2 font-normal">(Comma-separated)</span>
                </label>
                <input
                    type="text"
                    id="metaKeywords"
                    name="metaKeywords"
                    value={metaKeywords || ""}
                    onChange={onChange}
                    placeholder="e.g. kedarkantha trek, winter trek, uttarakhand"
                    className={inputClass}
                />
            </div>

            <div className="space-y-1">
                <label htmlFor="imageAlt" className="block text-sm font-medium text-gray-700">
                    Image Alt Text
                    <span className="text-gray-400 text-xs ml-2 font-normal">
                        (Describes the main image for Google Images and screen readers. Blank = title.)
                    </span>
                </label>
                <input
                    type="text"
                    id="imageAlt"
                    name="imageAlt"
                    value={imageAlt || ""}
                    onChange={onChange}
                    placeholder="e.g. Trekkers on the snow-covered Kedarkantha summit at sunrise"
                    className={inputClass}
                />
            </div>
        </fieldset>
    );
}
