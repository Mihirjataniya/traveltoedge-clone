// Shared between the server component that picks the opening image and the
// client component that rotates through them, so keep this file free of any
// "use client" directive.
export const heroImages = [
  "https://res.cloudinary.com/dpc5gwlvv/image/upload/q_auto,f_auto/v1784913914/traveltoedge/hero-1.png",
  "https://res.cloudinary.com/dpc5gwlvv/image/upload/q_auto,f_auto/v1784913948/traveltoedge/hero-7.png",
  "https://res.cloudinary.com/dpc5gwlvv/image/upload/q_auto,f_auto/v1784913927/traveltoedge/hero-3.png",
  "https://res.cloudinary.com/dpc5gwlvv/image/upload/q_auto,f_auto/v1784913932/traveltoedge/hero-4.png",
  "https://res.cloudinary.com/dpc5gwlvv/image/upload/q_auto,f_auto/v1784913942/traveltoedge/hero-6.png",
];

export const randomHeroIndex = () => Math.floor(Math.random() * heroImages.length);
