import Image from "next/image";
import FabookIcon from "./icons/FabookIcon";
import InstagramIcon from "./icons/InstagramIcon";
import LinkedinIcon from "./icons/LinkedinIcon";
import Link from "next/link";
import { Mail, MapPinIcon, PhoneCallIcon } from "lucide-react";
import MailIcon from "./icons/MailIcon";
import ThreadsIcon from "./icons/ThreadsIcon";


const Footer = () => {
  const imageMap = [
    { src: 'https://res.cloudinary.com/dpc5gwlvv/image/upload/v1745740920/IMG_9238_znz3ea.jpg', label: 'Peak Gazing' },
    { src: 'https://res.cloudinary.com/dpc5gwlvv/image/upload/v1745740919/IMG_9236_bnh1jl.jpg', label: 'Beach Adventures' },
    { src: 'https://res.cloudinary.com/dpc5gwlvv/image/upload/v1745740918/IMG_9240_kdrthr.jpg', label: 'Mountain Hiking' },
    { src: 'https://res.cloudinary.com/dpc5gwlvv/image/upload/v1745741594/IMG_9239_ctg4ng.jpg', label: 'Mountain Hiking' },
    { src: 'https://res.cloudinary.com/dpc5gwlvv/image/upload/v1745748037/WhatsApp_Image_2025-04-27_at_2.55.55_PM_oa0p3e.jpg', label: 'Bonfire nights' },
    { src: 'https://res.cloudinary.com/dpc5gwlvv/image/upload/v1745748038/WhatsApp_Image_2025-04-27_at_2.55.56_PM_1_nwrjub.jpg', label: 'Peak Gazing' },
    { src: 'https://res.cloudinary.com/dpc5gwlvv/image/upload/v1745748038/WhatsApp_Image_2025-04-27_at_2.55.56_PM_ihtzyg.jpg', label: 'Mountain Hiking' },
    { src: 'https://res.cloudinary.com/dpc5gwlvv/image/upload/v1745748039/WhatsApp_Image_2025-04-27_at_2.55.57_PM_mpszi5.jpg', label: 'Desert adventure' },
    { src: 'https://res.cloudinary.com/dpc5gwlvv/image/upload/v1745748039/WhatsApp_Image_2025-04-27_at_2.56.33_PM_ivv39w.jpg', label: 'Peak Gazing' },
    { src: 'https://res.cloudinary.com/dpc5gwlvv/image/upload/v1745748039/WhatsApp_Image_2025-04-27_at_2.56.29_PM_ifjekz.jpg', label: 'Mountain Hiking' },
    { src: 'https://res.cloudinary.com/dpc5gwlvv/image/upload/v1745748040/WhatsApp_Image_2025-04-27_at_2.51.45_PM_zcgdhu.jpg', label: 'Desert adventure' },
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
              <Link href={'/tours'}><li> Tour Packages</li></Link>
              <Link href={'/contact-us'}><li> Get Connected</li></Link>
              <Link href={'/about-us'}><li>Our Story</li></Link>
              <Link href={'/blogs'}><li> Travel Tales</li> </Link>
              <Link href={'/policies'}><li>Privacy Policy</li> </Link>
            </ul>
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-8 lg:text-left">
          <div>
            {/* <h3 className="font-semibold mb-2 text-md md:text-lg">Follow us on</h3> */}
            <div className="flex items-center lg:justify-start gap-4 text-white ">
              <Link target="_blank" href={"https://www.facebook.com/Traveltoedge/"}><FabookIcon username={"Traveltoedge"} /></Link>
              <Link target="_blank" href={"https://www.instagram.com/traveltoedge_/"}><InstagramIcon username={"traveltoedge_"} /></Link>
              <Link target="_blank" href={"https://www.linkedin.com/company/travel-to-edge/about/"}><LinkedinIcon username={"travel-to-edge"} /></Link>
              {/* <Link target="_blank" href={"https://www.threads.com/@traveltoedge_?xmt=AQGzlMWbR4MKQMuWzzvsxhJUVH7MlIIggG8Wnd0zBkFpwPc"}><ThreadsIcon username={"traveltoedge_"} /></Link> */}
              <Link target="_blank" href={"mailto:travel2edge@gmail.com"}>
                <MailIcon username={"travel2edge@gmail.com"} />
              </Link>
            </div>  
          </div>
          <div>
            <h3 className="font-semibold text-md md:text-lg mb-2">Contact</h3>
            <p className="text-white/90 text-sm md:text-lg leading-8">
              <div className="flex items-center gap-2">
                <MapPinIcon /> <p>Vasant Kunj Delhi, 110070</p>
              </div>
              {/* travel2edge@gmail.com <br /> */}
              <a className="flex items-center gap-2" href="tel:+919739240290"><PhoneCallIcon /> +91 70422 24419</a> 
              <a className="flex items-center gap-2" href="tel:+918810552497"><PhoneCallIcon /> +91 97392 40290</a>
              <a className="flex items-center gap-2" href="mailto:travel2edge@gmail.com"><Mail />travel2edge@gmail.com</a>
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
