import { cache } from 'react';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import { MapPin, Calendar, Star, StarHalf, Download } from 'lucide-react';
import connectToDatabase from '@/lib/db';
import { findTourBySlug } from '@/lib/seoLookup';
import { tourPath, safeDecode } from '@/lib/slug';
import { SITE_URL, SITE_NAME } from '@/lib/site';
import JsonLd from '@/components/JsonLd';
import TourGallery from '@/components/TourDetail/TourGallery';
import TourEnquiry from '@/components/TourDetail/TourEnquiry';

// Always read the latest tour so admin edits show immediately.
export const dynamic = 'force-dynamic';

// Shared by generateMetadata and the page so the DB is hit once per request.
const getTour = cache(async (slug) => {
    await connectToDatabase();
    return findTourBySlug(slug);
});

const describe = (tour) =>
    tour.metaDescription ||
    `${tour.title.trim()} – ${String(tour.duration).trim()} tour in ${String(tour.location).trim()}, starting from ₹${tour.price}. Book with ${SITE_NAME}.`;

// Old/non-canonical URL (former slug, title-derived after a custom slug was set) -> 301.
function redirectIfNotCanonical(slug, tour) {
    const path = tourPath(tour);
    if (safeDecode(slug) !== path.slice('/tours/'.length)) permanentRedirect(path);
}

const galleryOf = (tour) =>
    tour.coverImages?.length ? tour.coverImages : [tour.coverImage || tour.image].filter(Boolean);

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const tour = await getTour(slug);
    if (!tour) return { title: 'Tour not found', robots: { index: false } };
    redirectIfNotCanonical(slug, tour);

    // Admin meta title is used verbatim; otherwise the root "%s | Travel To Edge" template applies.
    const title = tour.metaTitle ? { absolute: tour.metaTitle } : tour.title;
    const description = describe(tour);
    const path = tourPath(tour);
    const image = galleryOf(tour)[0];
    const keywords = tour.metaKeywords?.split(',').map((k) => k.trim()).filter(Boolean);

    return {
        title,
        description,
        ...(keywords?.length && { keywords }),
        alternates: { canonical: path },
        openGraph: {
            title: tour.metaTitle || tour.title,
            description,
            url: path,
            type: 'website',
            siteName: SITE_NAME,
            images: image ? [{ url: image, alt: tour.imageAlt || tour.title }] : undefined,
        },
        twitter: { card: 'summary_large_image', title: tour.metaTitle || tour.title, description },
    };
}

export default async function TourDetailPage({ params }) {
    const { slug } = await params;
    const tour = await getTour(slug);
    if (!tour) notFound();

    redirectIfNotCanonical(slug, tour);

    const path = tourPath(tour);
    const gallery = galleryOf(tour);
    const alt = tour.imageAlt || tour.title;
    const url = `${SITE_URL}${path}`;

    const structuredData = [
        {
            '@context': 'https://schema.org',
            '@type': ['TouristTrip', 'Product'],
            name: tour.title,
            description: describe(tour),
            image: gallery,
            url,
            brand: { '@type': 'Brand', name: SITE_NAME },
            ...(tour.category && { category: tour.category }),
            ...(tour.location && { itinerary: { '@type': 'Place', name: tour.location } }),
            provider: { '@type': 'TravelAgency', name: SITE_NAME, url: SITE_URL },
            offers: {
                '@type': 'Offer',
                price: tour.price,
                priceCurrency: 'INR',
                availability: 'https://schema.org/InStock',
                url,
            },
        },
        {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
                { '@type': 'ListItem', position: 2, name: 'Tours', item: `${SITE_URL}/tours` },
                { '@type': 'ListItem', position: 3, name: tour.title, item: url },
            ],
        },
    ];

    return (
        <div className="w-full min-h-screen mt-24 px-6 md:px-10 xl:px-24">
            <JsonLd data={structuredData} />
            <div className="mx-auto max-w-5xl py-8">
                {/* Breadcrumb */}
                <nav aria-label="Breadcrumb" className="mb-4 text-sm text-gray-500">
                    <Link href="/" className="hover:text-[#03435e]">Home</Link>
                    <span className="mx-2">›</span>
                    <Link href="/tours" className="hover:text-[#03435e]">Tours</Link>
                    <span className="mx-2">›</span>
                    <span className="text-gray-700">{tour.title}</span>
                </nav>

                {/* Title + meta */}
                <div className="mb-3 flex flex-wrap gap-2">
                    {tour.category && (
                        <span className="inline-block rounded-full bg-[#03435e] px-3 py-1 text-xs font-semibold text-white">
                            {tour.category}
                        </span>
                    )}
                    {tour.isTopTour && (
                        <span className="inline-block rounded-full bg-yellow-400 px-3 py-1 text-xs font-semibold text-gray-900">
                            Top Tour
                        </span>
                    )}
                </div>
                <h1 className="mb-3 text-3xl font-bold leading-tight text-[#03435e] md:text-4xl">{tour.title}</h1>
                <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-gray-600 md:gap-6 md:text-base">
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{tour.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{tour.duration}</span>
                    </div>
                    {tour.rating > 0 && (
                        <div className="flex items-center gap-1">
                            {[...Array(Math.floor(tour.rating))].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                            {tour.rating % 1 > 0 && <StarHalf className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
                            <span className="ml-1">{tour.rating.toFixed(1)}</span>
                        </div>
                    )}
                </div>

                {/* Image carousel — full width, on top */}
                {gallery.length > 0 && <TourGallery images={gallery} alt={alt} />}

                {/* Price + actions band */}
                <div className="mt-5 flex flex-col gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-4">
                    <div>
                        <p className="text-[11px] text-gray-400">Starting From</p>
                        <p className="text-xl font-bold text-[#03435e] sm:text-2xl">₹ {tour.price?.toLocaleString?.() ?? tour.price}</p>
                    </div>
                    <div className="flex flex-col gap-2.5 sm:flex-row">
                        <TourEnquiry tourTitle={tour.title} />

                        {tour.itinerary && (
                            <a
                                href={tour.itinerary}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 rounded-lg border border-[#03435e] px-4 py-2 text-sm font-medium text-[#03435e] transition-colors hover:bg-gray-50"
                            >
                                <Download className="h-4 w-4" />
                                Download Itinerary
                            </a>
                        )}
                    </div>
                </div>

                {/* Content — full width below the banner */}
                <div className="mt-8">
                {tour.content ? (
                    <div
                        className="tiptap max-w-none !w-auto !overflow-visible"
                        dangerouslySetInnerHTML={{ __html: tour.content }}
                    />
                ) : (
                    <p className="text-gray-600">Detailed information for this tour is coming soon.</p>
                )}
                </div>

                {/* Back link */}
                <div className="mt-10 border-t border-gray-200 pt-8">
                    <Link
                        href="/tours"
                        className="inline-block rounded-md border border-gray-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-50"
                    >
                        ← All tours
                    </Link>
                </div>
            </div>
        </div>
    );
}
