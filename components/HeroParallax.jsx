"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Holds the hero back as the page scrolls, so the section below reads as rising
 * up over it rather than the hero sliding away.
 *
 * Deliberately transform-only, and the hero stays in normal flow. Pinning it
 * instead — `position: sticky` or `position: fixed` — produces the same look but
 * puts a full-viewport out-of-flow layer at the top of the document, which makes
 * the fixed navbar render clipped while scrolling back up. Two separate attempts
 * at pinning reproduced that; a transform does not, because nothing leaves the
 * flow and no new layer competes with the navbar.
 */
export default function HeroParallax({ children }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();

  // 0 while the hero fills the viewport, 1 once it has scrolled entirely past.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Drifting down by half its own height cancels half of the scroll, so the hero
  // reads as nearly stationary while the content below travels at full speed.
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div ref={ref} className="relative z-0">
      <motion.div style={reduceMotion ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}
