"use client"

import { useState, useEffect, useRef } from "react"
import { X, User } from "lucide-react"
import Image from "next/image"

const WHATSAPP_NUMBER = "918920464353"

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
            { id: "himalayas", text: "Himalayas (Ladakh, Himachal, Uttarakhand)", nextStep: "himalayas" },
        ],
    },
    north: {
        message: "North India offers rich history and culture! What interests you most?",
        options: [
            { id: "golden-triangle", text: "Golden Triangle (Delhi-Agra-Jaipur)", nextStep: "whatsapp" },
            { id: "rajasthan", text: "Royal Rajasthan Tour", nextStep: "whatsapp" },
            { id: "kashmir", text: "Kashmir Paradise", nextStep: "whatsapp" },
            { id: "himachal", text: "Himachal Hill Stations", nextStep: "whatsapp" },
        ],
    },
    south: {
        message: "South India is perfect for nature and culture lovers! What interests you?",
        options: [
            { id: "kerala", text: "Kerala Backwaters & Houseboats", nextStep: "whatsapp" },
            { id: "kerala-hills", text: "Kerala Hill Stations (Munnar, Wayanad)", nextStep: "whatsapp" },
            { id: "tamil-nadu", text: "Tamil Nadu Temple Trail", nextStep: "whatsapp" },
            { id: "karnataka", text: "Karnataka Heritage Tour", nextStep: "whatsapp" },
        ],
    },
    west: {
        message: "West India has beaches, cities, and culture! Popular choices:",
        options: [
            { id: "goa", text: "Goa Beach Holiday", nextStep: "whatsapp" },
            { id: "mumbai", text: "Mumbai City Experience", nextStep: "whatsapp" },
            { id: "gujarat", text: "Gujarat Cultural Tour", nextStep: "whatsapp" },
            { id: "maharashtra", text: "Maharashtra Hill Stations", nextStep: "whatsapp" },
        ],
    },
    east: {
        message: "East India offers unique experiences! These packages are special:",
        options: [
            { id: "kolkata", text: "Kolkata Cultural Heritage", nextStep: "whatsapp" },
            { id: "darjeeling", text: "Darjeeling Tea Gardens", nextStep: "whatsapp" },
            { id: "sikkim", text: "Sikkim Mountain Adventure", nextStep: "whatsapp" },
            { id: "sundarbans", text: "Sundarbans Wildlife Safari", nextStep: "whatsapp" },
        ],
    },
    himalayas: {
        message: "The Himalayas offer breathtaking experiences! Mountain packages:",
        options: [
            { id: "ladakh", text: "Ladakh Adventure", nextStep: "whatsapp" },
            { id: "manali", text: "Manali-Rohtang Pass", nextStep: "whatsapp" },
            { id: "uttarakhand", text: "Uttarakhand Char Dham", nextStep: "whatsapp" },
            { id: "spiti", text: "Spiti Valley Expedition", nextStep: "whatsapp" },
        ],
    },
    packages: {
        message: "What type of travel experience interests you most?",
        options: [
            { id: "family", text: "Family Vacations", nextStep: "whatsapp" },
            { id: "honeymoon", text: "Honeymoon Packages", nextStep: "whatsapp" },
            { id: "adventure", text: "Adventure Tours", nextStep: "whatsapp" },
            { id: "pilgrimage", text: "Pilgrimage Tours", nextStep: "whatsapp" },
            { id: "budget", text: "Budget Travel", nextStep: "whatsapp" },
        ],
    },
    planning: {
        message: "I'm here to help with your trip planning! What do you need to know?",
        options: [
            { id: "best-time", text: "Best time to visit destinations", nextStep: "bestTime" },
            { id: "documents", text: "Required documents & permits", nextStep: "whatsapp" },
            { id: "budget-help", text: "Budget planning help", nextStep: "whatsapp" },
            { id: "transport", text: "Transportation options", nextStep: "whatsapp" },
        ],
    },
    bestTime: {
        message: "Timing is crucial for a great trip! Which region are you planning to visit?",
        options: [
            { id: "north-timing", text: "North India (best Oct-Mar)", nextStep: "whatsapp" },
            { id: "south-timing", text: "South India (best Nov-Feb)", nextStep: "whatsapp" },
            { id: "mountain-timing", text: "Mountain Regions (best Apr-Jun)", nextStep: "whatsapp" },
        ],
    },
    booking: {
        message: "How can I assist you with bookings and support?",
        options: [
            { id: "new-booking", text: "Make a new booking", nextStep: "whatsapp" },
            { id: "existing-booking", text: "Modify existing booking", nextStep: "whatsapp" },
            { id: "cancellation", text: "Cancellation & refund policy", nextStep: "whatsapp" },
            { id: "emergency", text: "Travel emergency support", nextStep: "whatsapp" },
        ],
    },
}

const buildWhatsappLink = (selections) => {
    const lines = selections.map((item) => `• ${item}`).join("\n")
    const text = `Hi Travel To Edge! 👋\n\nI'm interested in:\n${lines}\n\nPlease share the details and pricing.`
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

export default function TravelChatbot() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([])
    const [currentStep, setCurrentStep] = useState("start")
    const [selections, setSelections] = useState([])
    const [showWhatsapp, setShowWhatsapp] = useState(false)
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
    }, [messages, showWhatsapp])

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
        const userMessage = {
            id: Date.now().toString(),
            type: "user",
            content: option.text,
        }

        setMessages((prev) => [...prev, userMessage])
        setSelections((prev) => [...prev, option.text])

        if (option.nextStep === "whatsapp") {
            // Fired synchronously inside the click handler so the browser keeps
            // the user-gesture trust and does not block the new tab.
            window.open(buildWhatsappLink([...selections, option.text]), "_blank", "noopener,noreferrer")

            setTimeout(() => {
                const handoffMessage = {
                    id: (Date.now() + 1).toString(),
                    type: "bot",
                    content:
                        "Perfect choice! 🎉 I've opened WhatsApp with your selections — our travel experts will share itineraries and pricing right away.",
                }
                setMessages((prev) => [...prev, handoffMessage])
                setShowWhatsapp(true)
            }, 500)
            return
        }

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

    const resetChat = () => {
        setMessages([])
        setCurrentStep("start")
        setSelections([])
        setShowWhatsapp(false)
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
                        src="https://res.cloudinary.com/dpc5gwlvv/image/upload/q_auto,f_auto/v1784913908/traveltoedge/travelcaptain-right.png"
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
                                        src="https://res.cloudinary.com/dpc5gwlvv/image/upload/q_auto,f_auto/v1784913904/traveltoedge/travelcaptain.png"
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
                                                src="https://res.cloudinary.com/dpc5gwlvv/image/upload/q_auto,f_auto/v1784913904/traveltoedge/travelcaptain.png"
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

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Footer */}
                    {showWhatsapp && (
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
