'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const images = [
  { src: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', label: 'Peak Gazing' },
  { src: 'https://images.unsplash.com/photo-1519338381761-c7523edc1f46?q=80&w=1954&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', label: 'Beach Adventures' },
  { src: 'https://images.unsplash.com/photo-1605039316064-c65942f60f5d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', label: 'Mountain Hiking' },
  { src: 'https://images.unsplash.com/photo-1510952267577-fc96d5ca660a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', label: 'Desert adventure' },
  { src: 'https://images.unsplash.com/photo-1699811250842-9338adf8fd9f?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', label: 'Bonfire nights' },
  { src: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', label: 'Peak Gazing' },
  { src: 'https://images.unsplash.com/photo-1519338381761-c7523edc1f46?q=80&w=1954&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', label: 'Beach Adventures' },
  { src: 'https://images.unsplash.com/photo-1605039316064-c65942f60f5d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', label: 'Mountain Hiking' },
  { src: 'https://images.unsplash.com/photo-1510952267577-fc96d5ca660a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', label: 'Desert adventure' },
  { src: 'https://images.unsplash.com/photo-1699811250842-9338adf8fd9f?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', label: 'Bonfire nights' },
  { src: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', label: 'Peak Gazing' },
  { src: 'https://images.unsplash.com/photo-1519338381761-c7523edc1f46?q=80&w=1954&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', label: 'Beach Adventures' },
  { src: 'https://images.unsplash.com/photo-1605039316064-c65942f60f5d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', label: 'Mountain Hiking' },
  { src: 'https://images.unsplash.com/photo-1510952267577-fc96d5ca660a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', label: 'Desert adventure' },
  { src: 'https://images.unsplash.com/photo-1699811250842-9338adf8fd9f?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', label: 'Bonfire nights' },
  { src: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', label: 'Peak Gazing' },
  { src: 'https://images.unsplash.com/photo-1519338381761-c7523edc1f46?q=80&w=1954&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', label: 'Beach Adventures' },
  { src: 'https://images.unsplash.com/photo-1605039316064-c65942f60f5d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', label: 'Mountain Hiking' },
  { src: 'https://images.unsplash.com/photo-1510952267577-fc96d5ca660a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', label: 'Desert adventure' },
  { src: 'https://images.unsplash.com/photo-1699811250842-9338adf8fd9f?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', label: 'Bonfire nights' },
];

export function CircularGallery() {
  const carouselRef = useRef(null);
  const cardRefs = useRef([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [displayImages, setDisplayImages] = useState([]);

  useEffect(() => {
    setDisplayImages(images);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || isMobile) return;

    const updateTransforms = () => {
      const centerX = carousel.getBoundingClientRect().left + carousel.offsetWidth / 2;
      const maxRotation = 45;
      const maxTranslateY = 100;

      cardRefs.current.forEach((card) => {
        if (!card) return;
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const distance = cardCenter - centerX;
        const ratio = distance / centerX;

        const rotate = Math.max(Math.min(ratio * maxRotation, maxRotation), -maxRotation);
        const translateY = Math.min(Math.abs(ratio * maxTranslateY), maxTranslateY);

        card.style.transform = `translateY(${translateY}px) rotateZ(${rotate}deg)`;
      });
    };

    const onScroll = () => {
      requestAnimationFrame(updateTransforms);
    };

    const onWheel = (e) => {
      e.preventDefault();
      carousel.scrollLeft += e.deltaY;
      onScroll();
    };

    updateTransforms();
    carousel.addEventListener('scroll', onScroll);
    carousel.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      carousel.removeEventListener('scroll', onScroll);
      carousel.removeEventListener('wheel', onWheel);
    };
  }, [isMobile, displayImages]);

  // Touch + Mouse Drag Handlers (optional for smoother UX on mobile)
  const onMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
    carouselRef.current.style.cursor = 'grabbing';
  };

  const onTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const onMouseUp = () => {
    setIsDragging(false);
    if (carouselRef.current) {
      carouselRef.current.style.cursor = 'grab';
    }
  };

  const onMouseLeave = () => {
    setIsDragging(false);
    if (carouselRef.current) {
      carouselRef.current.style.cursor = 'grab';
    }
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const onTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="w-full manual-height md:max-h-[800px] flex flex-col justify-center overflow-hidden">
      <div className="mb-6 px-4 md:px-10">
        <h2 className="text-3xl font-bold text-[#004B67]">Happy Travelers</h2>
      </div>

      <div
        ref={carouselRef}
        className={`carousel flex gap-12 md:gap-24 items-center overflow-x-auto no-scrollbar scroll-smooth px-4 md:px-10 py-5 ${isMobile ? '' : 'cursor-grab'}`}
        style={{
          display: 'flex',
          overflowX: 'auto',
          gap: isMobile ? '3rem' : '6rem',
          justifyContent: 'center',
          padding: '2rem 0',
        }}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
        onTouchStart={onTouchStart}
        onTouchEnd={onMouseUp}
        onTouchMove={onTouchMove}
      >
        {displayImages.map((item, i) => (
          <div
            key={i}
            ref={(el) => (cardRefs.current[i] = el)}
            className="card flex-shrink-0 bg-white rounded-2xl shadow-lg text-center transition-transform duration-300"
            style={{
              flex: '0 0 auto',
              width: isMobile ? '200px' : '300px',
              height: isMobile ? '250px' : '350px',
              background: 'white',
              borderRadius: '1rem',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
              transition: 'transform 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div className="relative w-full h-[85%] rounded-t-2xl overflow-hidden">
              <Image
                src={item.src}
                alt={item.label}
                fill
                className="object-cover"
              />
            </div>
            <p className="pt-2 pb-3 font-semibold text-gray-600">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


export const GalleryForPhone = () => {
  return (
    <div className="manual-height md:max-h-[800px] my-4 flex items-center w-full">
      <div className="w-full">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-[#004B67]">Happy Travelers</h2>
        </div>

        <div className="overflow-hidden">
          <div className="flex gap-4 overflow-x-auto scroll-smooth px-2 no-scrollbar py-3"
          >
            {images.map((tour, index) => (
              <div
                key={index}
                className="card flex-shrink-0 bg-white rounded-2xl shadow-lg text-center transition-transform duration-300"
                style={{
                  flex: '0 0 auto',
                  width: '200px',
                  height: '250px',
                  background: 'white',
                  borderRadius: '1rem',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                  textAlign: 'center',
                  transition: 'transform 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div className="relative w-full h-[85%] rounded-t-2xl overflow-hidden">
                  <Image
                    src={tour.src}
                    alt={tour.label}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="pt-2 pb-3 font-semibold text-gray-600">{tour.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}