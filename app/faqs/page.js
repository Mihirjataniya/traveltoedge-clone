'use client'
import { useState } from "react";
import { faqsData } from "./faqsData";

export default function FAQSection() {
    const [activeCategory, setActiveCategory] = useState("General");
    const [openIndex, setOpenIndex] = useState(null);

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setOpenIndex(null);
    };

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    return (
        <div className='w-full min-h-screen mt-2 flex items-center justify-center px-6 md:px-10 xl:px-24'>
            <div className=" text-[#03435e] px-4 md:px-16 py-8 md:py-16">
                <div className="flex flex-col gap-4 my-5 md:my-8 py-5">
                    <h2 className="text-3xl md:text-5xl font-bold">Questions?</h2>
                    <p className="text-gray-400 px-2 text-sm">If you have questions, we have answers for you here. In case we don't, please feel free to reach out to us here travel2edge@gmail.com</p>
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


