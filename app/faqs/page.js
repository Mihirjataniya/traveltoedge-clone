'use client'
import { useState } from "react";

const faqsData = {
    General: [
        {
            q: "What types of travel experiences do you offer?",
            a: "From laid-back getaways and adventure trips to wellness retreats, honeymoons, family vacations, staycations, and spiritual journeys - we design experiences both within India and abroad.",
        },
        {
            q: "Can I book only flight or hotel services through you?",
            a: "Absolutely! While we love curating full trips, you can book flights, hotels, airport transfers, or specific activities individually too.",
        },
        {
            q: "How far in advance should I book my trip?",
            a: "Ideally, 30 - 60 days in advance. International trips or peak season plans? Earlier is better for the best rates and smoother prep.",
        },
        {
            q: "Do you offer last-minute bookings?",
            a: "Yes, if there’s availability! We’ll try our best to create something great, but options may be limited and prices can vary.",
        },
        {
            q: "Can I travel solo through Travel To Edge?",
            a: "100%! We create solo-friendly trips with comfort, safety, and local experiences that feel personal and empowering.",
        },
    ],
    "Customization & Payments": [
        {
            q: "Can I create my own itinerary?",
            a: "Totally! Just tell us your travel mood, vibe, or goals - we’ll turn that into a blisfully memorable journey.",
        },
        {
            q: "What are your payment options?",
            a: "We accept UPI, bank transfers, and select offline methods. Full payment is required once your trip is finalized.",
        },
        {
            q: "Any hidden charges?",
            a: "Nope! We believe in full transparency. You’ll know what you're paying for - frank and clear.",
        },
        {
            q: "Do you offer installment or partial payments?",
            a: "Currently, we accept full payments only. EMI options are in the pipeline - stay tuned!",
        },
    ],
    "International Travel": [
        {
            q: "Do you provide assistance with visas?",
            a: "Yes ! We guide you through the entire process, including document prep, applications, and tips for smooth approval.",
        },
        {
            q: "Do you offer currency exchange or guidance?",
            a: "While we don’t exchange currency ourselves, we’ll direct you to trusted services and share tips on rates and how much to carry.",
        },
        {
            q: "Will I have a guide during trips?",
            a: " Most group tours include a local guide. For private trips, we can arrange one on request.",
        },
    ],
    "Safety & Support": [
        {
            q: "Is travel insurance mandatory?",
            a: "For international trips, yes. For domestic, it’s optional but highly recommended. We can help you get one.",
        },
        {
            q: "What if my flight gets canceled or delayed?",
            a: "Our support team will help reschedule flights or manage alternate transport as per airline policy and availability.",
        },
        {
            q: "What kind of medical support is available?",
            a: "We include access to local emergency numbers, nearest hospitals, and basic first-aid support. For serious concerns, we recommend carrying your health documents and insurance.",
        },
        {
            q: "Are your tours safe for families and children?",
            a: "Absolutely. We handpick child-friendly hotels, fun and safe activities, and destinations suited for all age groups.",
        },
        {
            q: "How do you ensure food and hygiene standards?",
            a: "We partner only with trusted hotels and vendors that meet cleanliness, hygiene, and food safety norms. Plus, we offer food recommendations based on your preferences.",
        },
    ],
    Miscellaneous: [
        {
            q: "Where are you located?",
            a: "We’re based in Delhi, but everything can be done online. No office visits needed unless you want to drop by and allow us your story over a cup of tea.",
        },
        {
            q: "Not sure where to go - can you help?",
            a: "Of course ! Tell us your vibe (beach, mountains, heritage, etc.), budget, and dates - we’ll suggest perfect destinations",
        },
        {
            q: " Do you offer travel gift cards or surprise trip planning?",
            a: "Yes! We can help you plan a surprise trip for someone or provide digital gift cards for special occasions.",
        },
        {
            q: "Can I follow you on social media?",
            a: "Yes. You’ll get a clear breakdown - covering stay, travel, experiences, inclusions, and optional extras - before confirming anything.",
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


