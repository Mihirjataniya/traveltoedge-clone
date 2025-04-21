'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
    CalendarIcon,
    Clock,
    MapPin,
    Share2,
    Facebook,
    Twitter,
    Bookmark,
    ChevronLeft,
    ChevronRight,
    Mail,
} from 'lucide-react'; import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton, WhatsappIcon } from 'react-share';
import { FacebookIcon, TwitterIcon, LinkedinIcon } from 'react-share';
import Head from 'next/head';

export default function BlogPost() {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const url = `https:/traveltoedge.com/blogs/${slug}`;
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                if (!slug) return;

                const title = decodeURIComponent(slug).replace(/_/g, ' ');

                const response = await fetch(`/api/get-blogs/find?title=${encodeURIComponent(title)}`);

                if (!response.ok) {
                    throw new Error(`Failed to fetch blog: ${response.statusText}`);
                }

                const data = await response.json();
                setBlog(data);
            } catch (error) {
                console.error('Error fetching blog:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [slug]);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
                    <p className="mt-4 text-lg font-medium text-[#03435e]">Loading article...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-center">
                    <h2 className="mb-4 text-2xl font-bold text-red-600">Something went wrong</h2>
                    <p className="text-[#03435e]">{error}</p>
                    <Link href="/blogs" className="mt-6 inline-block rounded-md bg-blue-600 px-6 py-2 text-white">
                        Return to all blogs
                    </Link>
                </div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-center">
                    <h2 className="mb-4 text-2xl font-bold">Blog not found</h2>
                    <p className="text-[#03435e]">The blog you're looking for doesn't exist or has been removed.</p>
                    <Link href="/blogs" className="mt-6 inline-block rounded-md bg-blue-600 px-6 py-2 text-white">
                        Browse all blogs
                    </Link>
                </div>
            </div>
        );
    }
    return (
        <div className="w-full min-h-screen mt-24">
            <Head>
                {/* Twitter Card Meta Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@YourTwitterHandle" />
                <meta name="twitter:title" content={blog.title} />
                <meta name="twitter:description" content={blog.excerpt || blog.content.slice(0, 150)} />
                <meta name="twitter:image" content={blog.image || "/placeholder.svg"} />
                <meta name="twitter:creator" content="@YourTwitterHandle" />
            </Head>

            <div className="relative h-[50vh] w-full overflow-hidden md:h-[70vh]">
                <Image
                    src={blog.image || "/placeholder.svg"}
                    alt={blog.title}
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
                            <div className="flex items-center gap-2">
                                <CalendarIcon className="h-4 w-4" />
                                <span>{blog.date}</span>
                            </div>
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
                {/* Author and share section */}
                <div className="mb-8 flex flex-col justify-between gap-4 border-b border-gray-200 pb-8 md:flex-row md:items-center">
                    <div className="flex items-center gap-4">
                        <div>
                            <p className="font-medium">Written by</p>
                            <h3 className="text-lg font-bold">{blog.author}</h3>
                        </div>
                    </div>
                    <div className='flex items-center gap-3'>
                        <span className="text-sm text-gray-500">Share:</span>
                        <div className="flex items-center gap-3">
                            <FacebookShareButton url={url}>
                                <FacebookIcon size={32} round />
                            </FacebookShareButton>
                            <TwitterShareButton url={url}>
                                <TwitterIcon size={32} round />
                            </TwitterShareButton>
                            <LinkedinShareButton url={url}>
                                <LinkedinIcon size={32} round />
                            </LinkedinShareButton>
                            <WhatsappShareButton url={url}>
                                <WhatsappIcon size={32} round />
                            </WhatsappShareButton>
                        </div>
                    </div>
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

                    {/* Additional content sections would be rendered based on blog data */}
                    {blog.sections && blog.sections.map((section, index) => (
                        <div key={index}>
                            <h2 className="mb-4 mt-8 text-2xl font-bold">{section.title}</h2>
                            {section.image && (
                                <div className="my-6 aspect-video overflow-hidden rounded-xl">
                                    <Image
                                        src={section.image}
                                        alt={section.title}
                                        width={800}
                                        height={450}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            )}
                            {section.content && section.content.map((paragraph, pIndex) => (
                                <p key={pIndex} className="my-6">{paragraph}</p>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Newsletter signup */}
                <div className="my-12 rounded-xl bg-[#03435e] p-8 text-white">
                    <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
                        <div className="md:flex-1">
                            <h3 className="mb-2 text-2xl font-bold">Subscribe to our Travel Newsletter</h3>
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

                {/* Related posts */}
                {blog.relatedPosts && blog.relatedPosts.length > 0 && (
                    <div className="my-12">
                        <h2 className="mb-6 text-2xl font-bold">You might also enjoy</h2>
                        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                            {blog.relatedPosts.map((post) => (
                                <div
                                    key={post.id}
                                    className="overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-lg"
                                >
                                    <div className="relative aspect-video overflow-hidden">
                                        <Image
                                            src={post.image || "/placeholder.svg"}
                                            alt={post.title}
                                            fill
                                            className="object-cover transition-transform duration-300 hover:scale-105"
                                        />
                                        <span className="absolute left-3 top-3 rounded-full text-[#03435e] px-2 py-1 text-xs font-semibold bg-white">
                                            {post.category}
                                        </span>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="line-clamp-2 text-lg font-bold">{post.title}</h3>
                                        <Link
                                            href={`/blog/${post.title.replace(/\s+/g, "_")}`}
                                            className="mt-2 inline-block text-sm font-bold underline text-[#03435e] hover:text-amber-600"
                                        >
                                            Read article
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

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