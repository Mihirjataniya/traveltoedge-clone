'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import axios from 'axios';
import {
    MapPin,
    Calendar,
    Star,
    StarHalf,
    Download,
    Send,
    X,
    Loader2,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';

export default function TourDetailPage() {
    const { slug } = useParams();
    const [tour, setTour] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showEnquiry, setShowEnquiry] = useState(false);

    useEffect(() => {
        const fetchTour = async () => {
            try {
                if (!slug) return;
                const res = await fetch(`/api/get-tours/find?slug=${encodeURIComponent(slug)}`);
                if (!res.ok) throw new Error('Failed to load tour');
                const data = await res.json();
                setTour(data);
            } catch (err) {
                console.error('Error fetching tour:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchTour();
    }, [slug]);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-[#03435e]"></div>
                    <p className="mt-4 text-lg font-medium text-[#03435e]">Loading tour...</p>
                </div>
            </div>
        );
    }

    if (error || !tour) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-center">
                    <h2 className="mb-4 text-2xl font-bold text-[#03435e]">Tour not found</h2>
                    <p className="text-gray-600">The tour you're looking for doesn't exist or has been removed.</p>
                    <Link href="/tours" className="mt-6 inline-block rounded-md bg-[#03435e] px-6 py-2 text-white">
                        Browse all tours
                    </Link>
                </div>
            </div>
        );
    }

    // Gallery: prefer coverImages[], fall back to single coverImage, then the card image.
    const gallery = (tour.coverImages?.length
        ? tour.coverImages
        : [tour.coverImage || tour.image].filter(Boolean));

    return (
        <div className="w-full min-h-screen mt-24 px-6 md:px-10 xl:px-24">
            <div className="mx-auto max-w-5xl py-8">
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
                {gallery.length > 0 && <ImageCarousel images={gallery} title={tour.title} />}

                {/* Price + actions band */}
                <div className="mt-5 flex flex-col gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-4">
                    <div>
                        <p className="text-[11px] text-gray-400">Starting From</p>
                        <p className="text-xl font-bold text-[#03435e] sm:text-2xl">₹ {tour.price?.toLocaleString?.() ?? tour.price}</p>
                    </div>
                    <div className="flex flex-col gap-2.5 sm:flex-row">
                        <button
                            onClick={() => setShowEnquiry(true)}
                            className="flex items-center justify-center gap-2 rounded-lg bg-[#03435e] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#02364b]"
                        >
                            <Send className="h-4 w-4" />
                            Enquire Now
                        </button>

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

            {showEnquiry && (
                <EnquiryModal tour={tour} onClose={() => setShowEnquiry(false)} />
            )}
        </div>
    );
}

function ImageCarousel({ images, title }) {
    const [idx, setIdx] = useState(0);
    const count = images.length;
    const go = (delta) => setIdx((i) => (i + delta + count) % count);

    return (
        <div>
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-gray-100">
                <Image
                    key={idx}
                    src={images[idx] || '/placeholder.svg'}
                    alt={`${title} — image ${idx + 1}`}
                    fill
                    className="object-cover"
                    priority
                />

                {count > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={() => go(-1)}
                            aria-label="Previous image"
                            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white transition-colors hover:bg-black/60"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                            type="button"
                            onClick={() => go(1)}
                            aria-label="Next image"
                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white transition-colors hover:bg-black/60"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>

                        <div className="absolute right-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-white">
                            {idx + 1} / {count}
                        </div>

                        <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
                            {images.map((_, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => setIdx(i)}
                                    aria-label={`Go to image ${i + 1}`}
                                    className={`h-2 rounded-full transition-all ${
                                        i === idx ? 'w-6 bg-white' : 'w-2 bg-white/60 hover:bg-white/90'
                                    }`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {count > 1 && (
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                    {images.map((src, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => setIdx(i)}
                            className={`relative aspect-video h-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                                i === idx ? 'border-[#03435e]' : 'border-transparent opacity-70 hover:opacity-100'
                            }`}
                        >
                            <Image src={src || '/placeholder.svg'} alt={`${title} thumbnail ${i + 1}`} fill className="object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

function EnquiryModal({ tour, onClose }) {
    const [form, setForm] = useState({ name: '', phone: '', email: '' });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [done, setDone] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const validate = () => {
        const errs = {};
        if (!form.name.trim()) errs.name = 'Name is required';
        if (!/^[0-9+\-\s]{7,15}$/.test(form.phone.trim())) errs.phone = 'Enter a valid phone number';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = 'Enter a valid email';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setSubmitting(true);
        try {
            const res = await axios.post('/api/form', {
                name: form.name.trim(),
                phone: form.phone.trim(),
                email: form.email.trim(),
                destination: tour.title,
                // Model requires these; not asked in the minimal tour enquiry form.
                date: 'Not specified',
                travellers: 'Not specified',
            });
            if (res.data.success) {
                setDone(true);
            } else {
                alert('Something went wrong. Please try again.');
            }
        } catch (err) {
            console.error('Enquiry submit error:', err);
            alert('Something went wrong. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={onClose}
        >
            <div
                className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mb-4 flex items-start justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-[#03435e]">Enquire About This Tour</h3>
                        <p className="mt-1 text-sm text-gray-500">{tour.title}</p>
                    </div>
                    <button onClick={onClose} className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {done ? (
                    <div className="py-8 text-center">
                        <CheckCircle2 className="mx-auto h-14 w-14 text-green-500" />
                        <p className="mt-4 text-lg font-semibold text-[#03435e]">Enquiry sent!</p>
                        <p className="mt-1 text-sm text-gray-500">Our team will reach out to you shortly.</p>
                        <button
                            onClick={onClose}
                            className="mt-6 rounded-lg bg-[#03435e] px-6 py-2 font-medium text-white hover:bg-[#02364b]"
                        >
                            Close
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">Name</label>
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Your full name"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-[#03435e] focus:ring-1 focus:ring-[#03435e]"
                            />
                            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">Phone</label>
                            <input
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="e.g. +91 98765 43210"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-[#03435e] focus:ring-1 focus:ring-[#03435e]"
                            />
                            {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
                            <input
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-[#03435e] focus:ring-1 focus:ring-[#03435e]"
                            />
                            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                        </div>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#03435e] px-4 py-3 font-medium text-white transition-colors hover:bg-[#02364b] disabled:opacity-60"
                        >
                            {submitting ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <Send className="h-4 w-4" />
                                    Submit Enquiry
                                </>
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
