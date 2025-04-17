import Image from "next/image";
import FabookIcon from "./icons/FabookIcon";
import InstagramIcon from "./icons/InstagramIcon";
import LinkedinIcon from "./icons/LinkedinIcon";
import TwitterIcon from "./icons/TwitterIcon";
import YoutubeIcon from "./icons/YoutubeIcon";

const Footer = () => {
  const imageMap = [
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
  return (
    <footer className="relative bg-[#024262] text-white pt-36 pb-12 px-6 md:px-16 mt-36">
      {/* 📸 Photo Rail */}
      {/* 📸 Photo Rail */}
      <div className="photo-rail-container">
        <div className="photo-rail">
          {[...Array(2)].flatMap((_, loopIndex) =>
            imageMap.map((item, imgIndex) => (
              <div key={`image-${loopIndex}-${imgIndex}`} className="image-wrapper">
                <Image
                  src={item.src}
                  alt={`photo-${loopIndex}-${imgIndex}`}
                  width={200}
                  height={200}
                  className="rounded-xl object-cover"
                />
              </div>
            ))
          )}

        </div>
      </div>



      {/* 💬 Footer Content */}
      <div className="flex flex-col lg:flex-row gap-12 md:items-center justify-between lg:gap-20">
        {/* Left Section */}
        <div className="hidden lg:flex flex-col text-3xl font-bold leading-tight text-center lg:text-left">
          <p>LET</p>
          <p>YOUR</p>
          <p>TRAVELING</p>
          <p>DREAM</p>
          <p>COME</p>
          <p>TRUE</p>
        </div>
        <div className="flex-col lg:hidden text-2xl font-bold leading-tight lg:text-left">
          <p>LET YOUR</p>
          <p>TRAVELING DREAM</p>
          <p>COME TRUE</p>
        </div>

        {/* Middle Sections */}
        <div className="flex flex-col  sm:flex-row gap-12">
          <div>
            <h3 className="font-semibold mb-4 md:text-center text-md md:text-lg">Our Activities</h3>
            <ul className="md:space-y-2 flex md:flex-col items-center md:items-start flex-wrap gap-4 md:gap-0 text-white/90 text-center sm:text-left text-sm md:text-lg">
              <li>Tours</li>
              <li>Adventures</li>
              <li>Sight Seeing</li>
              <li>Bookings</li>
              <li>Plannings</li>
              <li>Itineraries</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 sm:text-left text-md md:text-lg">Quick Links</h3>
            <ul className="md:space-y-2 flex md:flex-col items-center md:items-start flex-wrap gap-4 md:gap-0 text-white/90 text-center sm:text-left text-sm md:text-lg">
              <li>Tour Packages</li>
              <li>Get Connected</li>
              <li>Our Story</li>
              <li>Travel Tales</li>
            </ul>
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-8 lg:text-left">
          <div>
            <h3 className="font-semibold mb-2 text-md md:text-lg">Follow us on</h3>
            <div className="flex items-center lg:justify-start gap-4 text-white ">
              <FabookIcon  />
              <InstagramIcon />
              <TwitterIcon />
              <LinkedinIcon />
              <YoutubeIcon />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-md md:text-lg mb-2">Contact</h3>
            <p className="text-white/90 text-sm md:text-lg leading-8">
              123 Wanderlust Street,<br />
              Adventure City, Travelland 56789,<br />
              +1 (123) 456-7890<br />
              info@yourtravelagency.com
            </p>
          </div>
        </div>
      </div>

      <p className="mt-5 text-sm text-nowrap text-center border-t-1 border-gray-500 py-4">
        © {new Date().getFullYear()} Travel To Edge. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
