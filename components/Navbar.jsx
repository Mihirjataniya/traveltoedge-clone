"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Tours", path: "/tours" },
  { name: "Blogs", path: "/blogs" },
  { name: "Faqs", path: "/faqs" },
  { name: "About Us", path: "/about-us" },
  { name: "Contact Us", path: "/contact-us" },
];

const BRAND = "#03435e";

// Both logo files are 1080x570-ish. next/image gets that real ratio via the
// aspect-ratio box below rather than hardcoded width/height props, which is what
// was causing the console warnings and a visible shift on load.
const LOGO_LIGHT =
  "https://res.cloudinary.com/dpc5gwlvv/image/upload/q_auto,f_auto/v1784913900/traveltoedge/logo-white.png";
const LOGO_DARK =
  "https://res.cloudinary.com/dpc5gwlvv/image/upload/q_auto,f_auto/v1784913898/traveltoedge/logo.png";

const SCROLL_THRESHOLD = 50;

/**
 * Tracks whether the window has scrolled past `threshold`.
 *
 * Reads are rAF-throttled and the listener is passive, so scrolling is never
 * blocked on React work. The listener is attached once for the life of the
 * component — re-subscribing whenever the boolean flips (the previous
 * behaviour) meant tearing down and rebuilding a listener mid-scroll.
 */
function useScrolledPast(threshold) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;

    const read = () => {
      frame = 0;
      setScrolled(window.scrollY > threshold);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };

    read(); // The page can load already scrolled (refresh, restored position).
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [threshold]);

  return scrolled;
}

/**
 * Locks body scroll while the drawer is open.
 *
 * Restores the exact previous inline values instead of hardcoding "auto" on
 * cleanup, so the body is left untouched whenever the drawer is closed. Padding
 * compensates for the removed scrollbar so the page doesn't jump sideways.
 */
function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, [locked]);
}

export default function Navbar() {
  const pathname = usePathname();
  const [hoveredPath, setHoveredPath] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const drawerRef = useRef(null);
  const toggleRef = useRef(null);

  const scrolled = useScrolledPast(SCROLL_THRESHOLD);

  // The hero only exists on the homepage, so that is the only place the bar
  // starts see-through.
  const isTransparent = pathname === "/" && !scrolled;

  useScrollLock(isDrawerOpen);

  // Active state is derived from the URL, not mirrored into state. Nested routes
  // (/tours/some-tour) should still light up their top-level link.
  const isActivePath = (path) =>
    path === "/" ? pathname === "/" : pathname === path || pathname.startsWith(`${path}/`);

  useEffect(() => {
    setIsDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isDrawerOpen) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setIsDrawerOpen(false);
    };

    // pointerdown rather than click: it fires before focus moves, so the drawer
    // closes without a stray focus flash. Ref checks replace the old
    // `closest('.sidebar')` string matching.
    const onPointerDown = (event) => {
      if (drawerRef.current?.contains(event.target)) return;
      if (toggleRef.current?.contains(event.target)) return;
      setIsDrawerOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [isDrawerOpen]);

  return (
    <>
      <nav
        aria-label="Main"
        className={`fixed inset-x-0 top-0 z-50 flex h-20 items-center px-4 transition-colors duration-300 md:px-8 lg:px-12 ${
          isTransparent ? "bg-transparent" : "bg-white shadow-sm"
        }`}
      >
        <div className="flex w-full items-center justify-between">
          <Link
            href="/"
            aria-label="Travel To Edge — home"
            className="relative block aspect-[1080/570] w-24 shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current md:w-28 lg:w-32"
          >
            {/* Both logos stay mounted and cross-fade. Swapping the `src` instead
                would fetch a new file at the exact moment the bar changes colour,
                which showed up as a flicker on first scroll. */}
            <Image
              src={LOGO_LIGHT}
              alt="Travel To Edge"
              fill
              sizes="128px"
              priority
              className={`object-contain object-left transition-opacity duration-300 ${
                isTransparent ? "opacity-100" : "opacity-0"
              }`}
            />
            <Image
              src={LOGO_DARK}
              alt=""
              aria-hidden="true"
              fill
              sizes="128px"
              priority
              className={`object-contain object-left transition-opacity duration-300 ${
                isTransparent ? "opacity-0" : "opacity-100"
              }`}
            />
          </Link>

          <ul className="hidden items-center gap-1 text-base font-bold lg:flex xl:gap-2 xl:text-lg 2xl:gap-4 2xl:text-xl">
            {NAV_LINKS.map((link) => {
              const active = isActivePath(link.path);
              // Hovering any link moves the pill there; with nothing hovered it
              // rests on the current page.
              const highlighted = hoveredPath ? hoveredPath === link.path : active;

              return (
                <li
                  key={link.path}
                  className="relative"
                  onMouseEnter={() => setHoveredPath(link.path)}
                  onMouseLeave={() => setHoveredPath(null)}
                >
                  {highlighted && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: BRAND }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
                  )}

                  <Link
                    href={link.path}
                    prefetch={false}
                    aria-current={active ? "page" : undefined}
                    className={`relative block rounded-full px-4 py-2 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current xl:px-5 ${
                      highlighted ? "text-white" : isTransparent ? "text-white" : "text-[#03435e]"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setIsDrawerOpen((open) => !open)}
            aria-label={isDrawerOpen ? "Close menu" : "Open menu"}
            aria-expanded={isDrawerOpen}
            aria-controls="mobile-menu"
            className={`flex h-10 w-10 items-center justify-center rounded-md transition-colors lg:hidden ${
              isTransparent ? "text-white" : "text-[#03435e]"
            }`}
          >
            {isDrawerOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      <motion.div
        aria-hidden="true"
        initial={false}
        animate={{ opacity: isDrawerOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        // Untouchable when closed, so it can fade out instead of vanishing.
        className={`fixed inset-0 z-[55] bg-black/40 backdrop-blur-sm lg:hidden ${
          isDrawerOpen ? "" : "pointer-events-none"
        }`}
      />

      <motion.div
        id="mobile-menu"
        ref={drawerRef}
        // `inert` keeps the off-screen links out of tab order and out of the
        // accessibility tree while the drawer is closed. Without it they stay
        // focusable and keyboard users tab into an invisible menu.
        inert={!isDrawerOpen}
        initial={false}
        animate={{ x: isDrawerOpen ? "0%" : "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed inset-y-0 right-0 z-[60] flex w-64 flex-col overflow-y-auto bg-white shadow-xl md:w-80 lg:hidden"
      >
        <div className="flex h-20 items-center justify-end px-4">
          <button
            type="button"
            onClick={() => setIsDrawerOpen(false)}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-md text-[#03435e]"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <ul className="flex flex-col">
          {NAV_LINKS.map((link) => {
            const active = isActivePath(link.path);

            return (
              <li key={link.path}>
                <Link
                  href={link.path}
                  prefetch={false}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setIsDrawerOpen(false)}
                  className={`flex items-center border-l-4 px-6 py-4 transition-colors duration-200 ${
                    active
                      ? "border-[#03435e] bg-blue-50 font-bold text-[#03435e]"
                      : "border-transparent text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </motion.div>
    </>
  );
}
