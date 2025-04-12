'use client'
import { useState } from "react";

const faqsData = {
    General: [
        {
            q: "What types of travel experiences do you offer?",
            a: "We offer everything from leisure tours, adventure travel, honeymoon trips, spiritual journeys, luxury getaways to offbeat explorations—both domestic and international.",
        },
        {
            q: "Can I book only flight or hotel services through you?",
            a: "Yes! While we specialize in full travel packages, you can also book individual services like flights, hotels, transportation, and activities through us.",
        },
        {
            q: "How far in advance should I book my trip?",
            a: "We recommend booking at least 30–60 days in advance to get the best rates and secure your preferred itinerary. For international trips, earlier is even better.",
        },
        {
            q: "Do you offer last-minute bookings?",
            a: "Yes, we do assist with last-minute trips based on availability. However, prices may vary and options could be limited.",
        },
        {
            q: "Can I travel solo through Travel To Edge?",
            a: "Absolutely. We craft amazing solo travel experiences, ensuring comfort, safety, and meaningful adventures — all tailored for solo explorers.",
        },
    ],
    "Customization & Payments": [
        {
            q: "Can I create my own travel plan with you?",
            a: "Yes! We specialize in crafting custom itineraries based on your interests, travel style, and budget. Just tell us your vision — we’ll bring it to life.",
        },
        {
            q: "What payment methods do you accept?",
            a: "We accept UPI, bank transfers, and offline payment options. You'll receive detailed instructions once your trip details are finalized.",
        },
        {
            q: "Do you charge a planning or consultation fee?",
            a: "No, our consultation and initial planning discussions are completely free. You only pay once you finalize your package.",
        },
        {
            q: "Do you offer installment or partial payments?",
            a: "Currently, we only accept full payments once your package is confirmed. We do not offer installment options at this time.",
        },
    ],
    "International Travel": [
        {
            q: "Do you provide assistance with visas?",
            a: "Yes. We help you gather the required documents and assist with the application process. For certain countries, we also offer visa-on-arrival information.",
        },
        {
            q: "Do you offer currency exchange or guidance?",
            a: "While we don't provide exchange directly, we guide you to trusted providers and offer currency recommendations before departure.",
        },
        {
            q: "Will I get a guide for international tours?",
            a: "Yes, most of our international group tours include experienced local guides. For private/custom tours, a guide can be arranged on request.",
        },
    ],
    "Safety & Support": [
        {
            q: "Is travel insurance mandatory?",
            a: "For international trips, yes — we highly recommend travel insurance. For domestic travel, it's optional but advisable.",
        },
        {
            q: "What if my flight gets canceled or delayed?",
            a: "Our support team will help reschedule flights or manage alternate transport as per airline policy and availability.",
        },
        {
            q: "Is there emergency support during travel?",
            a: "Yes, our team is available 24/7 via phone or WhatsApp to assist you in emergencies or urgent changes.",
        },
        {
            q: "Are your tours safe for families and children?",
            a: "Definitely! We offer family-friendly tours with safe accommodations, kid-friendly activities, and guides trained to handle all age groups.",
        },
    ],
    Miscellaneous: [
        {
            q: "Where is your office located?",
            a: "We’re based in [Your City], but we operate online too — so you can plan your entire trip from the comfort of your home.",
        },
        {
            q: "How do I know which destination is right for me?",
            a: "Our travel experts help you choose the perfect destination based on your interests, travel goals, season, and budget.",
        },
        {
            q: "Can I follow you on social media for travel ideas?",
            a: "Yes! We regularly share travel tips, destination features, and client stories. Follow us on Instagram, Facebook, and YouTube.",
        },
        {
            q: "Can I get a detailed cost breakdown before booking?",
            a: "Of course. We provide a complete price breakdown covering accommodation, travel, experiences, and any optional inclusions before you confirm your booking.",
        },
    ],
};

export default function FAQSection() {
    const [activeCategory, setActiveCategory] = useState("General");
    const [openIndex, setOpenIndex] = useState(null);

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setOpenIndex(null);
    };

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    return (
        <div className='w-full min-h-screen mt-2 flex items-center justify-center'>
            <div className=" text-[#03435e] px-4 md:px-16 py-8 md:py-16">
                <div className="flex flex-col gap-4 my-5 md:my-8 py-5">
                    <h2 className="text-3xl md:text-5xl font-bold">Questions?</h2>
                    <p className="text-gray-400 px-2 text-sm">If you have questions, we have answers for you here. In case we don't, please feel free to reach out to us here contact@traveltoedge.com</p>
                </div>

                <div className="flex flex-col md:flex-row gap-10">
                    {/* Categories */}
                    <div className="md:w-1/4">
                        <div className="flex md:flex-col flex-wrap gap-2 md:gap-4">
                            {Object.keys(faqsData).map((category) => (
                                <button
                                    key={category}
                                    onClick={() => handleCategoryChange(category)}
                                    className={`text-left w-full md:w-auto text-base font-semibold transition-all duration-300 border-b-2 md:border-b-0 md:border-l-4 pl-2 ${category === activeCategory
                                        ? "border-[#03435e] text-[#03435e]"
                                        : "border-transparent text-gray-500 hover:text-[#03435e]"
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* FAQ List */}
                    <div className="md:w-3/4">
                        {faqsData[activeCategory].map((faq, index) => (
                            <div
                                key={index}
                                className="border-b border-gray-200 py-4 transition-all duration-300"
                            >
                                <button
                                    onClick={() => setOpenIndex(index === openIndex ? null : index)}
                                    className="w-full flex justify-between items-center text-left"
                                >
                                    <span className="text-lg font-semibold">{faq.q}</span>
                                    <span className="text-xl">{index === openIndex ? "−" : "+"}</span>
                                </button>
                                <div
                                    className={`mt-2 overflow-hidden transition-all duration-300 ${index === openIndex ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                        }`}
                                >
                                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                        {faq.a}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}


