import { cache } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import { CalendarIcon, Clock, MapPin, ChevronLeft, ChevronRight, Mail } from 'lucide-react';
import connectToDatabase from '@/lib/db';
import { findBlogBySlug } from '@/lib/seoLookup';
import { blogPath, safeDecode } from '@/lib/slug';
import { SITE_URL, SITE_NAME } from '@/lib/site';
import JsonLd from '@/components/JsonLd';
import BlogShare from '@/components/BlogDetail/BlogShare';

// Always read the latest post so admin edits show immediately.
export const dynamic = 'force-dynamic';

// Shared by generateMetadata and the page so the DB is hit once per request.
const getBlog = cache(async (slug) => {
    await connectToDatabase();
    return findBlogBySlug(slug);
});

const describe = (blog) => blog.metaDescription || blog.excerpt;

// Old/non-canonical URL (former slug, legacy title URL after a custom slug was set) -> 301.
function redirectIfNotCanonical(slug, blog) {
    const path = blogPath(blog);
    if (safeDecode(slug) !== safeDecode(path.slice('/blogs/'.length))) permanentRedirect(path);
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const blog = await getBlog(slug);
    if (!blog) return { title: 'Article not found', robots: { index: false } };
    redirectIfNotCanonical(slug, blog);

    // Admin meta title is used verbatim; otherwise the root "%s | Travel To Edge" template applies.
    const title = blog.metaTitle ? { absolute: blog.metaTitle } : blog.title;
    const description = describe(blog);
    const path = blogPath(blog);
    const keywords = blog.metaKeywords?.split(',').map((k) => k.trim()).filter(Boolean);

    return {
        title,
        description,
        ...(keywords?.length && { keywords }),
        authors: blog.author ? [{ name: blog.author }] : undefined,
        alternates: { canonical: path },
        openGraph: {
            title: blog.metaTitle || blog.title,
            description,
            url: path,
            type: 'article',
            siteName: SITE_NAME,
            publishedTime: blog.date ? new Date(blog.date).toISOString() : undefined,
            modifiedTime: blog.updatedAt ? new Date(blog.updatedAt).toISOString() : undefined,
            authors: blog.author ? [blog.author] : undefined,
            images: blog.image ? [{ url: blog.image, alt: blog.imageAlt || blog.title }] : undefined,
        },
        twitter: { card: 'summary_large_image', title: blog.metaTitle || blog.title, description },
    };
}

export default async function BlogPost({ params }) {
    const { slug } = await params;
    const blog = await getBlog(slug);
    if (!blog) notFound();
    redirectIfNotCanonical(slug, blog);

    const url = `${SITE_URL}${blogPath(blog)}`;
    const published = blog.date ? new Date(blog.date) : null;

    const structuredData = [
        {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: blog.title,
            description: describe(blog),
            image: blog.image ? [blog.image] : undefined,
            url,
            mainEntityOfPage: url,
            datePublished: published?.toISOString(),
            dateModified: new Date(blog.updatedAt || blog.date || Date.now()).toISOString(),
            author: { '@type': 'Person', name: blog.author || SITE_NAME },
            publisher: {
                '@type': 'Organization',
                name: SITE_NAME,
                logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon.png` },
            },
            ...(blog.metaKeywords && { keywords: blog.metaKeywords }),
            ...(blog.category && { articleSection: blog.category }),
        },
        {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
                { '@type': 'ListItem', position: 2, name: 'Blogs', item: `${SITE_URL}/blogs` },
                { '@type': 'ListItem', position: 3, name: blog.title, item: url },
            ],
        },
    ];

    return (
        <div className="w-full min-h-screen mt-24 px-6 md:px-10 xl:px-24">
            <JsonLd data={structuredData} />

            <div className="relative h-[50vh] w-full overflow-hidden md:h-[70vh]">
                <Image
                    src={blog.image || "/placeholder.svg"}
                    alt={blog.imageAlt || blog.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-6 text-white md:p-12">
                    <div className="container mx-auto max-w-4xl">
                        <span className="mb-3 inline-block rounded-full bg-white text-[#03435e] px-3 py-1 text-xs font-semibold">
                            {blog.category}
                        </span>
                        <h1 className="mb-4 text-3xl font-bold leading-tight md:text-5xl">{blog.title}</h1>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-white/80 md:gap-6">
                            {published && (
                                <div className="flex items-center gap-2">
                                    <CalendarIcon className="h-4 w-4" />
                                    <time dateTime={published.toISOString()}>
                                        {published.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </time>
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span>{blog.readTime}</span>
                            </div>
                            {blog.location && (
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    <span>{blog.location}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-6xl px-4 py-8">
                {/* Breadcrumb */}
                <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
                    <Link href="/" className="hover:text-[#03435e]">Home</Link>
                    <span className="mx-2">›</span>
                    <Link href="/blogs" className="hover:text-[#03435e]">Blogs</Link>
                    <span className="mx-2">›</span>
                    <span className="text-gray-700">{blog.title}</span>
                </nav>

                {/* Author and share section */}
                <div className="mb-8 flex flex-col justify-between gap-4 border-b border-gray-200 pb-8 md:flex-row md:items-center">
                    <div className="flex items-center gap-4">
                        <div>
                            <p className="font-medium">Written by</p>
                            <p className="text-lg font-bold">{blog.author}</p>
                        </div>
                    </div>
                    <BlogShare url={url} />
                </div>

                {/* Main content */}
                <div className="prose max-w-none">
                    <p className="text-xl font-medium leading-relaxed text-[#03435e]">{blog.excerpt}</p>
                    {blog.content && (
                        <div
                            className="tiptap prose prose-lg max-w-none my-6"
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                        />
                    )}
                </div>

                {/* Newsletter signup */}
                <div className="my-12 rounded-xl bg-[#03435e] p-8 text-white">
                    <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
                        <div className="md:flex-1">
                            <h2 className="mb-2 text-2xl font-bold">Subscribe to our Travel Newsletter</h2>
                            <p className="text-amber-100">
                                Get weekly updates on hidden destinations, travel tips, and exclusive content delivered straight to your
                                inbox.
                            </p>
                        </div>
                        <div className="w-full md:w-auto">
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    aria-label="Your email address"
                                    className="w-full rounded-md px-4 py-3 text-gray-500 placeholder-gray-500 outline-none border-2 sm:w-64"
                                />
                                <button className="flex items-center justify-center gap-2 rounded-md bg-gray-900 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-800">
                                    <Mail className="h-4 w-4" />
                                    <span>Subscribe</span>
                                </button>
                            </div>
                            <p className="mt-2 text-xs text-amber-100">We respect your privacy. Unsubscribe at any time.</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div className="my-8 flex items-center justify-between border-t border-gray-200 pt-8">
                    <Link href="#" className="flex items-center gap-2 text-gray-600 transition-colors hover:text-[#03435e]">
                        <ChevronLeft className="h-4 w-4" />
                        <span>Previous article</span>
                    </Link>
                    <Link
                        href="/blogs"
                        className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-50"
                    >
                        All articles
                    </Link>
                    <Link href="#" className="flex items-center gap-2 text-gray-600 transition-colors hover:text-[#03435e]">
                        <span>Next article</span>
                        <ChevronRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
