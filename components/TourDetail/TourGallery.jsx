'use client';
import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// `alt` describes the main image (admin "Image Alt Text", else the tour title).
export default function TourGallery({ images, alt }) {
    const [idx, setIdx] = useState(0);
    const count = images.length;
    const go = (delta) => setIdx((i) => (i + delta + count) % count);

    return (
        <div>
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-gray-100">
                <Image
                    key={idx}
                    src={images[idx] || '/placeholder.svg'}
                    alt={idx === 0 ? alt : `${alt} — image ${idx + 1}`}
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
                            <Image src={src || '/placeholder.svg'} alt={`${alt} thumbnail ${i + 1}`} fill className="object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
