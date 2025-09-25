"use client"

import { useState, useEffect, useRef } from "react"
import { X, User } from "lucide-react"
import Image from "next/image"
import axios from "axios"

const chatFlow = {
    start: {
        message: "Namaste! 🙏 I'm Trip Captain, your travel assistant. How can I help you explore incredible India?",
        options: [
            { id: "destinations", text: "Popular Indian Destinations", nextStep: "destinations" },
            { id: "packages", text: "Tour Packages", nextStep: "packages" },
            { id: "planning", text: "Trip Planning Help", nextStep: "planning" },
            { id: "booking", text: "Booking & Support", nextStep: "booking" },
        ],
    },
    destinations: {
        message: "India has amazing destinations! Which region would you like to explore?",
        options: [
            { id: "north", text: "North India (Delhi, Agra, Rajasthan)", nextStep: "north" },
            { id: "south", text: "South India (Kerala, Tamil Nadu, Karnataka)", nextStep: "south" },
            { id: "west", text: "West India (Goa, Mumbai, Gujarat)", nextStep: "west" },
            { id: "east", text: "East India (Kolkata, Darjeeling, Sikkim)", nextStep: "east" },
            { id: "himalayas", text: "Himalayas (Kashmir, Himachal, Uttarakhand)", nextStep: "himalayas" },
        ],
    },
    north: {
        message: "North India offers rich history and culture! What interests you most?",
        options: [
            { id: "golden-triangle", text: "Golden Triangle (Delhi-Agra-Jaipur)", nextStep: "goldenTriangleDetails" },
            { id: "rajasthan", text: "Royal Rajasthan Tour", nextStep: "rajasthanDetails" },
            { id: "kashmir", text: "Kashmir Paradise", nextStep: "kashmirDetails" },
            { id: "himachal", text: "Himachal Hill Stations", nextStep: "himachalDetails" },
        ],
    },
    goldenTriangleDetails: {
        message: "Golden Triangle is perfect for first-time visitors! What duration works for you?",
        options: [
            { id: "gt-5days", text: "5 Days Express Tour", nextStep: "gtDuration" },
            { id: "gt-7days", text: "7 Days Detailed Tour", nextStep: "gtDuration" },
            { id: "gt-10days", text: "10 Days with Extensions", nextStep: "gtDuration" },
        ],
    },
    gtDuration: {
        message: "Great choice! What type of accommodation do you prefer?",
        options: [
            { id: "budget-hotels", text: "Budget Hotels (3-star)", nextStep: "leadCapture" },
            { id: "luxury-hotels", text: "Luxury Hotels (5-star)", nextStep: "leadCapture" },
            { id: "heritage-hotels", text: "Heritage Properties", nextStep: "leadCapture" },
        ],
    },
    rajasthanDetails: {
        message: "Royal Rajasthan is magical! Which cities would you like to cover?",
        options: [
            { id: "raj-classic", text: "Classic Circuit (Jaipur-Udaipur-Jodhpur)", nextStep: "rajAccommodation" },
            { id: "raj-extended", text: "Extended Tour (+ Jaisalmer-Pushkar)", nextStep: "rajAccommodation" },
            { id: "raj-luxury", text: "Palace & Fort Experience", nextStep: "rajAccommodation" },
        ],
    },
    rajAccommodation: {
        message: "Rajasthan offers unique stays! What's your preference?",
        options: [
            { id: "palace-hotels", text: "Heritage Palace Hotels", nextStep: "leadCapture" },
            { id: "desert-camps", text: "Desert Camps in Jaisalmer", nextStep: "leadCapture" },
            { id: "haveli-stays", text: "Traditional Havelis", nextStep: "leadCapture" },
        ],
    },
    kashmirDetails: {
        message: "Kashmir is paradise on earth! What season interests you?",
        options: [
            { id: "kashmir-summer", text: "Summer (May-Aug) - Gardens & Lakes", nextStep: "kashmirActivities" },
            { id: "kashmir-winter", text: "Winter (Dec-Feb) - Snow & Skiing", nextStep: "kashmirActivities" },
            { id: "kashmir-spring", text: "Spring (Mar-Apr) - Tulip Season", nextStep: "kashmirActivities" },
        ],
    },
    kashmirActivities: {
        message: "Kashmir offers amazing experiences! What would you like to do?",
        options: [
            { id: "houseboat-stay", text: "Houseboat Stay on Dal Lake", nextStep: "leadCapture" },
            { id: "gulmarg-skiing", text: "Gulmarg Skiing & Gondola", nextStep: "leadCapture" },
            { id: "pahalgam-trekking", text: "Pahalgam Valley Trekking", nextStep: "leadCapture" },
        ],
    },
    himachalDetails: {
        message: "Himachal has beautiful hill stations! Which area attracts you?",
        options: [
            { id: "shimla-manali", text: "Shimla-Manali Circuit", nextStep: "himachalActivities" },
            { id: "dharamshala", text: "Dharamshala-McLeod Ganj", nextStep: "himachalActivities" },
            { id: "spiti-valley", text: "Spiti Valley Adventure", nextStep: "himachalActivities" },
        ],
    },
    himachalActivities: {
        message: "What type of experience are you looking for in Himachal?",
        options: [
            { id: "adventure-sports", text: "Adventure Sports & Trekking", nextStep: "leadCapture" },
            { id: "peaceful-retreat", text: "Peaceful Mountain Retreat", nextStep: "leadCapture" },
            { id: "cultural-tour", text: "Cultural & Spiritual Tour", nextStep: "leadCapture" },
        ],
    },
    south: {
        message: "South India is perfect for nature and culture lovers! What interests you?",
        options: [
            { id: "kerala", text: "Kerala Backwaters & Hills", nextStep: "keralaDetails" },
            { id: "tamil-nadu", text: "Tamil Nadu Temple Trail", nextStep: "tamilnaduDetails" },
            { id: "karnataka", text: "Karnataka Heritage Tour", nextStep: "karnatakaDetails" },
            { id: "goa-karnataka", text: "Goa Beach + Karnataka", nextStep: "goaKarnatakaDetails" },
        ],
    },
    keralaDetails: {
        message: "Kerala is God's Own Country! What would you like to experience?",
        options: [
            { id: "backwaters", text: "Backwater Houseboat Experience", nextStep: "keralaActivities" },
            { id: "hill-stations", text: "Hill Stations (Munnar, Wayanad)", nextStep: "keralaActivities" },
            { id: "beaches", text: "Beaches (Kovalam, Varkala)", nextStep: "keralaActivities" },
        ],
    },
    keralaActivities: {
        message: "Kerala offers unique experiences! What's your priority?",
        options: [
            { id: "ayurveda", text: "Ayurveda & Wellness Treatments", nextStep: "leadCapture" },
            { id: "wildlife", text: "Wildlife Sanctuaries & Nature", nextStep: "leadCapture" },
            { id: "cultural", text: "Cultural Shows & Local Life", nextStep: "leadCapture" },
        ],
    },
    west: {
        message: "West India has beaches, cities, and culture! Popular choices:",
        options: [
            { id: "goa", text: "Goa Beach Holiday", nextStep: "leadCapture" },
            { id: "mumbai", text: "Mumbai City Experience", nextStep: "leadCapture" },
            { id: "gujarat", text: "Gujarat Cultural Tour", nextStep: "leadCapture" },
            { id: "maharashtra", text: "Maharashtra Hill Stations", nextStep: "leadCapture" },
        ],
    },
    east: {
        message: "East India offers unique experiences! These packages are special:",
        options: [
            { id: "kolkata", text: "Kolkata Cultural Heritage", nextStep: "leadCapture" },
            { id: "darjeeling", text: "Darjeeling Tea Gardens", nextStep: "leadCapture" },
            { id: "sikkim", text: "Sikkim Mountain Adventure", nextStep: "leadCapture" },
            { id: "sundarbans", text: "Sundarbans Wildlife Safari", nextStep: "leadCapture" },
        ],
    },
    himalayas: {
        message: "The Himalayas offer breathtaking experiences! Mountain packages:",
        options: [
            { id: "ladakh", text: "Ladakh Adventure", nextStep: "leadCapture" },
            { id: "manali", text: "Manali-Rohtang Pass", nextStep: "leadCapture" },
            { id: "uttarakhand", text: "Uttarakhand Char Dham", nextStep: "leadCapture" },
            { id: "shimla", text: "Shimla-Kullu-Manali", nextStep: "leadCapture" },
        ],
    },
    packages: {
        message: "What type of travel experience interests you most?",
        options: [
            { id: "family", text: "Family Vacations", nextStep: "family" },
            { id: "honeymoon", text: "Honeymoon Packages", nextStep: "honeymoon" },
            { id: "adventure", text: "Adventure Tours", nextStep: "adventure" },
            { id: "pilgrimage", text: "Pilgrimage Tours", nextStep: "pilgrimage" },
            { id: "budget", text: "Budget Travel", nextStep: "budget" },
        ],
    },
    family: {
        message: "Perfect for family bonding! How many family members will be traveling?",
        options: [
            { id: "small-family", text: "2-4 Members (Couple + Kids)", nextStep: "familySize" },
            { id: "large-family", text: "5-8 Members (Extended Family)", nextStep: "familySize" },
            { id: "multi-generation", text: "Multi-generation Group", nextStep: "familySize" },
        ],
    },
    familySize: {
        message: "Great! What type of family experience are you looking for?",
        options: [
            { id: "beach-family", text: "Beach Resort Experience", nextStep: "leadCapture" },
            { id: "cultural-family", text: "Cultural Heritage Tour", nextStep: "leadCapture" },
            { id: "adventure-family", text: "Mild Adventure & Nature", nextStep: "leadCapture" },
        ],
    },
    honeymoon: {
        message: "Congratulations! What kind of romantic experience do you envision?",
        options: [
            { id: "beach-romance", text: "Beach & Sunset Romance", nextStep: "honeymoonType" },
            { id: "mountain-romance", text: "Mountain & Valley Romance", nextStep: "honeymoonType" },
            { id: "palace-romance", text: "Royal Palace Romance", nextStep: "honeymoonType" },
        ],
    },
    honeymoonType: {
        message: "Perfect choice! What's your preferred honeymoon duration?",
        options: [
            { id: "week-honeymoon", text: "7 Days Romantic Getaway", nextStep: "leadCapture" },
            { id: "extended-honeymoon", text: "10-12 Days Extended Tour", nextStep: "leadCapture" },
            { id: "luxury-honeymoon", text: "Luxury 5-Star Experience", nextStep: "leadCapture" },
        ],
    },
    planning: {
        message: "I'm here to help with your trip planning! What do you need to know?",
        options: [
            { id: "best-time", text: "Best time to visit destinations", nextStep: "bestTime" },
            { id: "documents", text: "Required documents & permits", nextStep: "documents" },
            { id: "budget-help", text: "Budget planning help", nextStep: "budgetHelp" },
            { id: "transport", text: "Transportation options", nextStep: "transport" },
        ],
    },
    bestTime: {
        message: "Timing is crucial for a great trip! Which region are you planning to visit?",
        options: [
            { id: "north-timing", text: "North India Timing", nextStep: "northTiming" },
            { id: "south-timing", text: "South India Timing", nextStep: "southTiming" },
            { id: "mountain-timing", text: "Mountain Regions Timing", nextStep: "mountainTiming" },
        ],
    },
    northTiming: {
        message: "Here's the best time for North India destinations:",
        options: [
            { id: "winter-north", text: "Winter (Oct-Mar): Perfect for Rajasthan, Delhi, Agra", nextStep: "leadCapture" },
            { id: "spring-north", text: "Spring (Feb-Apr): Ideal for sightseeing", nextStep: "leadCapture" },
            { id: "avoid-summer", text: "Avoid Summer (May-Jun): Too hot for comfort", nextStep: "leadCapture" },
        ],
    },
    southTiming: {
        message: "Here's the best time for South India destinations:",
        options: [
            { id: "winter-south", text: "Winter (Nov-Jan): Ideal for wildlife safaris", nextStep: "leadCapture" },
            { id: "summer-south", text: "Summer (Apr-Jun): Beaches & festivals", nextStep: "leadCapture" },
            { id: "monsoon-south", text: "Monsoon (Jun-Sep): Waterfalls & lush landscapes", nextStep: "leadCapture" },
        ],
    },
    mountainTiming: {
        message: "Here's the best time for Mountain destinations:",
        options: [
            { id: "winter-mountain", text: "Winter (Dec-Feb): Snow & skiing", nextStep: "leadCapture" },
            { id: "summer-mountain", text: "Summer (Apr-Jun): Trekking & adventure", nextStep: "leadCapture" },
            { id: "avoid-rainy", text: "Avoid Rainy Season (July-Sept): Roads may be closed", nextStep: "leadCapture" },
        ],
    },
    documents: {
        message: "Important documents you'll need for Indian travel:",
        options: [
            { id: "domestic-docs", text: "Domestic Travel: ID Proof, COVID Certificate", nextStep: "leadCapture" },
            { id: "permits", text: "Special Permits: Ladakh, Sikkim, Andaman", nextStep: "leadCapture" },
            { id: "foreign-tourist", text: "Foreign Tourists: Visa, Passport, Registration", nextStep: "leadCapture" },
        ],
    },
    budgetHelp: {
        message: "Let me help you plan your budget effectively:",
        options: [
            { id: "budget-breakdown", text: "Detailed budget breakdown for destinations", nextStep: "leadCapture" },
            { id: "money-saving", text: "Money-saving tips for Indian travel", nextStep: "leadCapture" },
            { id: "payment-options", text: "Payment options & booking process", nextStep: "leadCapture" },
        ],
    },
    transport: {
        message: "Transportation options across India:",
        options: [
            { id: "flights", text: "Domestic flights & airport transfers", nextStep: "leadCapture" },
            { id: "trains", text: "Train bookings & railway passes", nextStep: "leadCapture" },
            { id: "road-transport", text: "Car rentals & bus services", nextStep: "leadCapture" },
        ],
    },
    booking: {
        message: "How can I assist you with bookings and support?",
        options: [
            { id: "new-booking", text: "Make a new booking", nextStep: "leadCapture" },
            { id: "existing-booking", text: "Modify existing booking", nextStep: "leadCapture" },
            { id: "cancellation", text: "Cancellation & refund policy", nextStep: "leadCapture" },
            { id: "emergency", text: "Travel emergency support", nextStep: "leadCapture" },
        ],
    },
}

export default function TravelChatbot() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([])
    const [currentStep, setCurrentStep] = useState("start")
    const [interactionCount, setInteractionCount] = useState(0)
    const [showLeadForm, setShowLeadForm] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        destination: '',
        date: new Date(),
        travellers: 1
    })
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [showPopText, setShowPopText] = useState(true)
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    useEffect(() => {
        const interval = setInterval(() => {
            setShowPopText((prev) => !prev)
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    const openChat = () => {
        setIsOpen(true)
        if (messages.length === 0) {
            const startMessage = chatFlow.start
            setMessages([
                {
                    id: "1",
                    type: "bot",
                    content: startMessage.message,
                    options: startMessage.options,
                },
            ])
        }
    }

    const closeChat = () => {
        setIsOpen(false)
    }

    const handleOptionClick = (option) => {
        // Add user message
        const userMessage = {
            id: Date.now().toString(),
            type: "user",
            content: option.text,
        }

        setMessages((prev) => [...prev, userMessage])
        setInteractionCount((prev) => prev + 1)

        if (interactionCount >= 4 || option.nextStep === "leadCapture") {
            setTimeout(() => {
                const leadMessage = {
                    id: (Date.now() + 1).toString(),
                    type: "bot",
                    content:
                        "I'd love to help you with more details! Could you please share your contact information so our travel experts can assist you better?",
                }
                setMessages((prev) => [...prev, leadMessage])
                setShowLeadForm(true)
            }, 500)
            return
        }

        // Continue with normal flow
        if (option.nextStep && chatFlow[option.nextStep]) {
            setTimeout(() => {
                const nextStep = chatFlow[option.nextStep]
                const botMessage = {
                    id: (Date.now() + 1).toString(),
                    type: "bot",
                    content: nextStep.message,
                    options: nextStep.options,
                }
                setMessages((prev) => [...prev, botMessage])
                setCurrentStep(option.nextStep)
            }, 1000)
        }
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitted(true)
        setShowLeadForm(false)
        try {
            const response = await axios.post("/api/form", formData)
            if (response.data.success) {
                setTimeout(() => {
                    const thankYouMessage = {
                        id: Date.now().toString(),
                        type: "bot",
                        content: `Thank you, ${formData.name}! 🎉 Our travel experts will contact you within 24 hours at ${formData.email} or ${formData.phone}. We're excited to help plan your perfect adventure!`,
                    }
                    setMessages((prev) => [...prev, thankYouMessage])
                }, 500)
            }
        } catch (error) {
            alert(error)
        }

    }

    const resetChat = () => {
        setMessages([])
        setCurrentStep("start")
        setInteractionCount(0)
        setShowLeadForm(false)
        setIsSubmitted(false)
        setFormData({ name: "", phone: "", email: "", query: "" })
        openChat()
    }

    return (
        <>
            {/* Chat Button */}
            <div className="fixed bottom-8 right-8 md:bottom-8 md:right-8 z-50">
                <div
                    className={`absolute top-1/2 -translate-y-1/2 -left-4 transform bg-gradient-to-r from-slate-700 to-slate-800 text-white px-3 py-2 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium shadow-lg transition-all duration-500 whitespace-nowrap ${showPopText && !isOpen ? "opacity-100 scale-100 -translate-x-full -translate-y-1/2" : "opacity-0 scale-95 -translate-x-full -translate-y-1/2"
                        }`}
                    style={{ backgroundColor: "#0F3E4A" }}
                >
                    Ask Trip Captain 💬
                    <div
                        className="absolute top-1/2 -translate-y-1/2 left-full w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent"
                        style={{ borderLeftColor: "#0F3E4A" }}
                    ></div>
                </div>

                <button
                    onClick={openChat}
                    className={`h-12 w-12 md:h-16 md:w-16 rounded-full shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center overflow-hidden ${isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
                        }`}
                    style={{ backgroundColor: "#0F3E4A" }}
                >
                    <Image
                        src="/travelcaptain-right.png"
                        alt="Liza - Travel Guide"
                        width={48}
                        height={48}
                        className="w-full h-full object-cover rounded-full"
                    />
                </button>
            </div>

            {/* Chat Window */}
            <div
                className={`fixed bottom-4 right-4 md:bottom-8 md:right-8 w-[calc(100vw-2rem)] h-[calc(100vh-8rem)] md:w-[400px] md:h-[600px] bg-white rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 z-50 border border-gray-200 ${isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="text-white rounded-t-2xl p-4 md:p-5 flex-shrink-0" style={{ backgroundColor: "#0F3E4A" }}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 md:gap-3">
                                <div className="h-8 w-8 md:h-10 md:w-10 rounded-full overflow-hidden border-2 border-white/20 flex-shrink-0">
                                    <Image
                                        src="/travelcaptain.png"
                                        alt="Liza - Travel Guide"
                                        width={40}
                                        height={40}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-base md:text-lg font-semibold truncate">Trip Captain</h3>
                                    <p className="text-xs md:text-sm text-white/80 truncate">Your Travel Expert</p>
                                </div>
                            </div>
                            <button
                                onClick={closeChat}
                                className="text-white hover:bg-white/20 h-8 w-8 rounded-full flex items-center justify-center transition-colors flex-shrink-0"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-4 bg-gray-50 min-h-0">
                        {messages.map((message) => (
                            <div key={message.id}>
                                <div className={`flex items-start gap-2 md:gap-3 ${message.type === "user" ? "flex-row-reverse" : ""}`}>
                                    <div
                                        className={`h-7 w-7 md:h-8 md:w-8 rounded-full flex items-center justify-center flex-shrink-0 text-white overflow-hidden ${message.type === "bot" ? "border border-white/20" : ""
                                            }`}
                                        style={{ backgroundColor: message.type === "user" ? "#0F3E4A" : "transparent" }}
                                    >
                                        {message.type === "user" ? (
                                            <User className="h-3 w-3 md:h-4 md:w-4" />
                                        ) : (
                                            <Image
                                                src="/travelcaptain.png"
                                                alt="Liza - Travel Guide"
                                                width={32}
                                                height={32}
                                                className="w-full h-full object-cover rounded-full"
                                            />
                                        )}
                                    </div>

                                    {/* Message bubbles */}
                                    <div
                                        className={`flex-1 max-w-[85%] p-3 md:p-4 rounded-2xl text-xs md:text-sm leading-relaxed ${message.type === "user"
                                            ? "text-white rounded-tr-md"
                                            : "bg-white text-gray-800 rounded-tl-md shadow-sm border"
                                            }`}
                                        style={message.type === "user" ? { backgroundColor: "#0F3E4A" } : {}}
                                    >
                                        {message.content}
                                    </div>
                                </div>

                                {/* Option buttons */}
                                {message.options && (
                                    <div className="mt-3 md:mt-4 ml-9 md:ml-11 space-y-2">
                                        {message.options.map((option) => (
                                            <button
                                                key={option.id}
                                                onClick={() => handleOptionClick(option)}
                                                className="w-full text-left p-2.5 md:p-3 bg-white border border-gray-200 rounded-xl transition-all duration-200 text-xs md:text-sm font-medium text-gray-700 hover:bg-opacity-90"
                                                style={{
                                                    "&:hover": {
                                                        backgroundColor: "#0F3E4A",
                                                        borderColor: "#0F3E4A",
                                                    },
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.backgroundColor = "#0F3E4A"
                                                    e.currentTarget.style.borderColor = "#0F3E4A"
                                                    e.currentTarget.style.color = "white"
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.backgroundColor = "white"
                                                    e.currentTarget.style.borderColor = "#e5e7eb"
                                                    e.currentTarget.style.color = "#374151"
                                                }}
                                            >
                                                {option.text}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Lead form */}
                        {showLeadForm && (
                            <div className="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-gray-200 ml-9 md:ml-11">
                                <form onSubmit={handleFormSubmit} className="space-y-3 md:space-y-4">
                                    <div>
                                        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                                            required
                                            className="w-full p-2.5 md:p-3 border border-gray-300 rounded-lg outline-none transition-all text-sm focus:border-[#0F3E4A] focus:ring-2 focus:ring-[#0F3E4A]/20"
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                                            required
                                            className="w-full p-2.5 md:p-3 border border-gray-300 rounded-lg outline-none transition-all text-sm focus:border-[#0F3E4A] focus:ring-2 focus:ring-[#0F3E4A]/20"
                                            placeholder="Enter your phone number"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                                            required
                                            className="w-full p-2.5 md:p-3 border border-gray-300 rounded-lg outline-none transition-all text-sm focus:border-[#0F3E4A] focus:ring-2 focus:ring-[#0F3E4A]/20"
                                            placeholder="Enter your email address"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                                            Additional Comments
                                        </label>
                                        <textarea
                                            value={formData.destination}
                                            onChange={(e) => setFormData((prev) => ({ ...prev, destination: e.target.value }))}
                                            className="w-full p-2.5 md:p-3 border border-gray-300 rounded-lg outline-none transition-all resize-none text-sm focus:border-[#0F3E4A] focus:ring-2 focus:ring-[#0F3E4A]/20"
                                            rows={3}
                                            placeholder="Tell us about your travel preferences..."
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full text-white p-2.5 md:p-3 rounded-lg font-medium transition-all duration-200 text-sm hover:bg-opacity-90"
                                        style={{ backgroundColor: "#0F3E4A" }}
                                    >
                                        Submit Details
                                    </button>
                                </form>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Footer */}
                    {isSubmitted && (
                        <div className="p-4 md:p-5 border-t border-gray-200 bg-white rounded-b-2xl flex-shrink-0">
                            <button
                                onClick={resetChat}
                                className="w-full p-2.5 md:p-3 border rounded-lg font-medium transition-colors text-sm hover:bg-[#0F3E4A] hover:text-white"
                                style={{ borderColor: "#0F3E4A", color: "#0F3E4A" }}
                            >
                                Start New Conversation
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}