"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu } from 'lucide-react';

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Tours", path: "/tours" },
  { name: "Blogs", path: "/blogs" },
  { name: "Faqs", path: "/faqs" },
  { name: "About Us", path: "/about-us" },
  { name: "Contact Us", path: "/contact-us" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [hoveredLink, setHoveredLink] = useState(null);
  const [activeLink, setActiveLink] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);


  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isSidebarOpen &&
        !event.target.closest('.sidebar') &&
        !event.target.closest('.menu-button')) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isSidebarOpen]);


  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  return (
    <>
      <nav className="fixed top-0 max-w-[1600px] mx-auto z-50 w-full py-2 px-4 md:px-8 lg:px-12 bg-white flex flex-col justify-center h-20 md:h-20 lg:h-20 ">
        <div className="flex items-center outline-none justify-between w-full">
          <Link href={'/'}>
           <Image
            src="/LOGO.png"
            alt="Travel To Edge - Explore the World"
            width={120}
            height={50}
            className="w-24 md:w-28 outline-none lg:w-32 h-auto"
            priority
          />
          </Link>
         

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex space-x-1  text-base xl:text-lg font-bold">
            {navLinks.map((link) => {
              const isHovered = hoveredLink === link.path;
              const isActive = activeLink === link.path;
              const showHighlight = isHovered || (isActive && !hoveredLink);

              return (
                <li
                  key={link.path}
                  className="relative px-2 xl:px-4 py-2"
                  onMouseEnter={() => setHoveredLink(link.path)}
                  onMouseLeave={() => setHoveredLink(null)}
                  onClick={() => setActiveLink(link.path)}
                >
                  {showHighlight && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-[#03435e] rounded-full z-0"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20
                      }}
                    />
                  )}

                  <Link
                    href={link.path}
                    prefetch={false}
                    className={`relative z-10 px-2 xl:px-4 py-2 transition-colors duration-200 ${showHighlight ? "text-white" : "text-[#03435e]"
                      }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <button
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 menu-button"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="text-[#03434e] font-bold" />
          </button>
        </div>
      </nav>

      {isSidebarOpen && (
        <div className="lg:hidden fixed inset-0 backdrop-blur-sm bg-opacity-50 z-40 transition-opacity duration-300"></div>
      )}

      <motion.div
        className="sidebar lg:hidden fixed top-0 right-0 h-full w-64 md:w-80 bg-white shadow-xl z-50 overflow-y-auto"
        initial={{ x: '100%' }}
        animate={{ x: isSidebarOpen ? 0 : '100%' }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 text-[#03435e]"
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <ul className="flex flex-col mt-6">
          {navLinks.map((link) => {
            const isActive = activeLink === link.path;

            return (
              <li key={link.path} className="relative">
                <Link
                  href={link.path}
                  prefetch={false}
                  className={`flex items-center px-6 py-4 border-l-4 transition-all duration-200 ${isActive
                      ? "border-[#03435e] bg-blue-50 text-[#03435e] font-bold"
                      : "border-transparent hover:bg-gray-100 text-gray-700"
                    }`}
                  onClick={() => {
                    setActiveLink(link.path);
                    setIsSidebarOpen(false);
                  }}
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