// import { FaInstagram, FaFacebookF, FaXTwitter, FaYoutube } from "react-icons/fa6";

import FabookIcon from "./icons/FabookIcon";
import InstagramIcon from "./icons/InstagramIcon";
import LinkedinIcon from "./icons/LinkedinIcon";
import TwitterIcon from "./icons/TwitterIcon";
import YoutubeIcon from "./icons/YoutubeIcon";

const Footer = () => {
  return (
    <footer className="bg-[#024262] text-white py-12 px-6 md:px-16 mt-10">
      <div className="flex flex-col lg:flex-row gap-12 justify-between lg:gap-20">
        {/* Left Section */}
        <div className="hidden lg:flex flex-col text-3xl font-bold leading-tight text-center lg:text-left">
          <p>LET</p>
          <p>YOUR</p>
          <p>TRAVELING</p>
          <p>DREAM</p>
          <p>COME</p>
          <p>TRUE</p>
        </div>
        <div className="flex-col lg:hidden text-3xl font-bold leading-tight lg:text-left">
          <p>LET YOUR</p>
          <p>TRAVELING DREAM</p>
          <p>COME TRUE</p>
          <p>TRUE</p>
        </div>

        {/* Middle Sections */}
        <div className="flex flex-col  sm:flex-row gap-12">
          <div>
            <h3 className="font-semibold mb-4 md:text-center text-lg">Our Activities</h3>
            <ul className="space-y-2 flex md:flex-col items-center md:items-start flex-wrap gap-4 md:gap-0 text-white/90 text-center sm:text-left">
              <li>Tours</li>
              <li>Adventures</li>
              <li>Sight Seeing</li>
              <li>Bookings</li>
              <li>Plannings</li>
              <li>Itineraries</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 sm:text-left text-lg">Quick Links</h3>
            <ul className="space-y-2 flex md:flex-col items-center md:items-start flex-wrap gap-4 md:gap-0 text-white/90 text-center sm:text-left">
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
            <h3 className="font-semibold mb-2">Follow us on</h3>
            <div className="flex items-center lg:justify-start gap-4 text-white text-xl">
              <FabookIcon />
              <InstagramIcon />
              <TwitterIcon />
              <LinkedinIcon />
              <YoutubeIcon />
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Contact</h3>
            <p className="text-white/90 text-sm leading-7">
              123 Wanderlust Street,<br />
              Adventure City, Travelland 56789,<br />
              +1 (123) 456-7890<br />
              info@yourtravelagency.com
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
