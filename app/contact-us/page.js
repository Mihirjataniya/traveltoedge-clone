    "use client"
    import { useState, useEffect } from "react"
    import SearchableDropdown from "@/components/ui/SearchableDropDown"
    import {
        User,
        Phone,
        Mail,
        MapPin,
        Calendar,
        Users,
        MessageSquare,
        Plane,
        Check,
        Award,
        Shield,
        CreditCard
    } from "lucide-react"
    import DatePicker from "react-datepicker"
    import "react-datepicker/dist/react-datepicker.css"
    import { motion, AnimatePresence } from 'framer-motion'
    import axios from "axios"

    export default function TravelForm() {
        const [selectedDestination, setSelectedDestination] = useState("")
        const [showOtherInput, setShowOtherInput] = useState(false)
        const [otherLocation, setOtherLocation] = useState("")
        const [isFormSubmitted, setIsFormSubmitted] = useState(false)
        const [errors, setErrors] = useState({})
        const [formData, setFormData] = useState({
            name: '',
            phone: '',
            email: '',
            destination: '',
            date: '',
            travellers: ''
        })
        const [travelDate, setTravelDate] = useState(null)


        const validateForm = (formData) => {
            const errors = {}; // ✅ Initialize the object
            if (!formData.name || formData.name.length < 2) {
                errors.name = "Please enter a valid name.";
            }
            const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
            if (!emailRegex.test(formData.email)) {
                errors.email = "Please enter a valid email.";
            }
            const phoneRegex = /^(\+?\d{1,3}[- ]?)?\d{10}$/;
            if (!phoneRegex.test(formData.phone)) {
                errors.phone = "Please enter a valid 10-digit phone number.";
            }
            if (!formData.destination) {
                errors.destination = "Please select a destination.";
            }
            if (!formData.travellers || isNaN(formData.travellers) || Number(formData.travellers) <= 0) {
                errors.travellers = "Please enter a valid number of travellers.";
            }
            if (!formData.date) {
                errors.date = "Please select a date.";
            }
            return errors;
        };


        const destinations = [
            "Udaipur Kumbhalgarh",
            "Manal-Kasol with Sissu",
            "Leh",
            "Kashmir Winter Paradise",
            "Jibhi Tirthan",
            "Mcleodganj Triund",
            "Other",
        ]
        const travelQuotes = [
            "Go beyond the map.",
            "Your trip. Your story. Our magic.",
            "Because every journey should feel like you.",
            "Not just travel. Transformation.",
            "Where your wanderlust meets our why.",
            "We plan. You vibe.",
            "Escape ordinary. Enter unforgettable.",
            "For travelers who don’t do basic.",
            "Discover Yourself.",
            "From plans to paths to purpose.",
            "Wander wide, wonder wild.",
            "Bold breaks. Brilliant beginnings.",
            "More moments. Less maps.",
            "Travel, thrill, tell tales.",
            "Paths that pulse with purpose.",
            "Journeys that jolt joy.",
            "Soulful stays. Serene stories.",
            "Dream, drift, discover.",
            "Mindful miles. Meaningful memories.",
            "Roam, relax, repeat.",
            "Skip the same. Seek the spark."
          ];
        const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
        const quoteWords = travelQuotes[currentQuoteIndex].split(' ')
        useEffect(() => {
            const interval = setInterval(() => {
                setCurrentQuoteIndex((prev) => (prev + 1) % travelQuotes.length)
            }, 6000); // shorter for better sync
            return () => clearInterval(interval);
        }, []);




        const handleSubmit = async (e) => {
            e.preventDefault()
            const validationErrors = validateForm(formData);
            setErrors(validationErrors);
            if (Object.keys(validationErrors).length === 0) {
                try {
                    const response = await axios.post("/api/form", formData)
                    if (response.data.success) {
                        setIsFormSubmitted(true)
                    }
                } catch (error) {
                    alert(error)
                }
                console.log("Submitting...", formData);
            } else {
                console.log(formData)
                console.log("Validation failed");
            }
        }

        return (
            <div className="w-full manual-height md:max-h-[800px] flex items-center justify-center md:p-4 mt-24">
                <div className="w-full mx-auto rounded-xl overflow-hidden shadow-xl flex flex-col md:flex-row h-auto">

                    <div className="w-full md:w-1/2 relative bg-[#03435e] text-white h-[300px] md:h-auto">
                        {/* Background Image with Overlay */}
                        <div className="absolute inset-0 z-0">
                            <img
                                src="https://images.unsplash.com/photo-1728237361486-550345630c13?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Tropical beach destination"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#03435e]/80 to-transparent md:from-[#03435e]/80 md:to-transparent"></div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10 p-4 sm:p-6 h-full flex flex-col justify-between">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Explore Paradise</h1>
                                <p className="text-base sm:text-lg mb-2 sm:mb-4 text-sky-100">
                                    Your journey to unforgettable adventures begins here
                                </p>
                            </div>

                            {/* Animated Quote - Hidden on smallest screens */}
                            <div className="block bg-white/10 backdrop-blur-sm p-3 sm:p-4 rounded-lg border border-white/20">
                                <AnimatePresence key={currentQuoteIndex} mode="wait">
                                    {quoteWords.map((word, index) => (
                                        <motion.span
                                            key={`${word}-${index}-${currentQuoteIndex}`}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ delay: index * 0.3, duration: 0.4 }} // smoother
                                            className="text-sm sm:text-lg italic font-light inline-block"
                                        >
                                            {word}&nbsp;
                                        </motion.span>
                                    ))}
                                </AnimatePresence>

                            </div>

                            {/* Features - Simplified on mobile */}
                            <div className="mt-2 sm:mt-6">
                                <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">Why Travel With Us:</h3>
                                <ul className="space-y-1 sm:space-y-2">
                                    <li className="flex items-center">
                                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-teal-400 flex items-center justify-center mr-2">
                                            <Award size={14} color="#03435e" />
                                        </div>
                                        <span className="text-xs sm:text-sm">Personalized itineraries</span>
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-teal-400 flex items-center justify-center mr-2">
                                            <Check size={14} color="#03435e" />
                                        </div>
                                        <span className="text-xs sm:text-sm">24/7 travel support</span>
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-teal-400 flex items-center justify-center mr-2">
                                            <Shield size={14} color="#03435e" />
                                        </div>
                                        <span className="text-xs sm:text-sm">Best price guarantee</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Right Side Form */}
                    <div className="w-full md:w-1/2 bg-white px-4 sm:px-6 py-3 overflow-y-auto">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-[#03435e] mb-3 sm:mb-4 relative">
                                Your Dream Trip Starts Here
                            </h2>

                            {isFormSubmitted ? (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4 text-center">
                                    <Check size={24} className="mx-auto mb-2 text-green-600" />
                                    <h3 className="text-base sm:text-lg font-semibold text-green-800 mb-1">Thank You!</h3>
                                    <p className="text-xs sm:text-sm text-green-700">
                                        Your travel request has been submitted. We'll contact you shortly!
                                    </p>
                                </div>
                            ) : (
                                <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
                                    <div className="flex flex-col gap-2">
                                        <label className="block text-[#03435e] font-semibold text-xs sm:text-sm italic">Name</label>
                                        <div className="flex items-center gap-2">
                                            <User size={16} className=" text-[#03435e]" />
                                            <input
                                                onChange={(e) => {
                                                    setFormData((data) => ({
                                                        ...data,
                                                        name: e.target.value
                                                    }));
                                                }}
                                                type="text"
                                                className="w-full bg-white text-[#03435e] border-0 border-b-2 border-[#03435e] focus:outline-none  placeholder:text-gray-300 italic  py-2 text-xs sm:text-sm transition-all"
                                                placeholder="John Doe"
                                                required
                                            />
                                            {errors.name && <p className="text-red-500 text-xs pl-5 mt-1">{errors.name}</p>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                                        <div className="flex flex-col gap-2">
                                            <label className="block text-[#03435e] font-semibold text-xs sm:text-sm italic">Phone</label>
                                            <div className="flex items-center gap-2">
                                                <Phone size={16} className=" text-[#03435e]" />
                                                <input
                                                    onChange={(e) => {
                                                        setFormData((data) => ({
                                                            ...data,
                                                            phone: e.target.value
                                                        }));
                                                    }}
                                                    type="tel"
                                                    className="w-full bg-white text-[#03435e] border-0 border-b-2 border-[#03435e] focus:outline-none  placeholder:text-gray-300 italic  py-2 text-xs sm:text-sm transition-all"
                                                    placeholder="+911234567890"
                                                    required
                                                />
                                            </div>
                                            {errors.phone && <p className="text-red-500 text-xs pl-5 mt-1">{errors.phone}</p>}
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="block text-[#03435e] font-semibold text-xs sm:text-sm italic">Email</label>
                                            <div className="flex items-center gap-2">
                                                <Mail size={16} className=" text-[#03435e]" />
                                                <input
                                                    onChange={(e) => {
                                                        setFormData((data) => ({
                                                            ...data,
                                                            email: e.target.value
                                                        }));
                                                    }}
                                                    type="email"
                                                    className="w-full bg-white text-[#03435e] border-0 border-b-2 border-[#03435e] focus:outline-none  placeholder:text-gray-300 italic  py-2 text-xs sm:text-sm transition-all"
                                                    placeholder="johndoe@gmail.com"
                                                    required
                                                />
                                            </div>
                                            {errors.email && <p className="text-red-500 text-xs pl-5 mt-1">{errors.email}</p>}
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="block text-[#03435e] font-semibold text-xs sm:text-sm italic">
                                            Travel Destination
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <MapPin size={16} className=" text-[#03435e]" />
                                            <SearchableDropdown
                                                value={selectedDestination}
                                                onChange={(value) => {
                                                    setSelectedDestination(value)
                                                    if (value !== "Other") {
                                                        setFormData((data) => ({
                                                            ...data,
                                                            destination: value
                                                        }));
                                                    }
                                                    setShowOtherInput(value === "Other")
                                                }}
                                                options={destinations}
                                            />
                                        </div>
                                        {errors.destination && <p className="text-red-500 text-xs pl-5 mt-1">{errors.destination}</p>}
                                    </div>

                                    {showOtherInput && (
                                        <div className="flex flex-col gap-2">
                                            <label className="block text-[#03435e] font-semibold text-xs sm:text-sm italic">
                                                Enter Destination
                                            </label>
                                            <div className="flex items-center">
                                                <MapPin size={16} className="text-[#03435e]" />
                                                <input
                                                    type="text"
                                                    value={otherLocation}
                                                    onChange={(e) => {
                                                        setFormData((data) => ({
                                                            ...data,
                                                            destionation: e.target.value
                                                        }));
                                                    }}
                                                    className="w-full bg-white text-[#03435e] border-0 border-b-2 border-[#03435e] focus:outline-none  placeholder:text-gray-300 italic  py-2 text-xs sm:text-sm transition-all"
                                                    placeholder="Your travel destination"
                                                    required={showOtherInput}
                                                />
                                            </div>
                                            {errors.travellers && <p className="text-red-500 text-xs pl-5 mt-1">{errors.travellers}</p>}
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                                        <div className="flex flex-col gap-2">
                                            <label className="block text-[#03435e] font-semibold text-xs sm:text-sm italic">Travel Date</label>
                                            <div className="flex items-center gap-2">
                                                <Calendar size={16} className="text-[#03435e]" />
                                                <DatePicker
                                                    selected={travelDate}
                                                    onChange={(date) => {
                                                        setTravelDate(date)
                                                        setFormData((data) => ({
                                                            ...data,
                                                            date: date
                                                        }));
                                                    }}
                                                    minDate={new Date()} // Only allow future dates
                                                    placeholderText="Select travel date"
                                                    className="w-full bg-white text-[#03435e] border-0 border-b-2 border-[#03435e] focus:outline-none  placeholder:text-gray-300 italic  py-2 text-xs sm:text-sm transition-all"
                                                    required
                                                />
                                            </div>
                                            {errors.date && <p className="text-red-500 text-xs pl-5 mt-1">{errors.date}</p>}
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="block text-[#03435e] font-semibold text-xs sm:text-sm italic">
                                                No. of Travellers
                                            </label>
                                            <div className="flex items-center gap-2">
                                                <Users size={16} className=" text-[#03435e]" />
                                                <input
                                                    onChange={(e) => {
                                                        setFormData((data) => ({
                                                            ...data,
                                                            travellers: e.target.value
                                                        }));
                                                    }}
                                                    type="number"
                                                    min="1"
                                                    className="w-full bg-white text-[#03435e] border-0 border-b-2 border-[#03435e] focus:outline-none  placeholder:text-gray-300 italic  py-2 text-xs sm:text-sm transition-all"
                                                    placeholder="5"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        
                                        className="w-full mt-3 sm:mt-5 bg-[#03435e] text-white py-2 px-4 rounded-md hover:bg-[#022c3f] transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2 shadow-md text-xs sm:text-sm"
                                    >
                                        <span>Start Your Journey</span>
                                        <Plane size={16} className="text-white" />
                                    </button>

                                    {/* Trust Badges - Simplified on mobile */}
                                    <div className="pt-3 border-t border-gray-200">
                                        <p className="text-[10px] sm:text-xs text-gray-500 text-center mb-2 sm:mb-3">
                                            Trusted by thousands of travelers
                                        </p>
                                        <div className="flex justify-center space-x-4 sm:space-x-6">
                                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                                <Award size={16} className="text-[#03435e]" />
                                            </div>
                                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                                <Shield size={16} className="text-[#03435e]" />
                                            </div>
                                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                                <CreditCard size={16} className="text-[#03435e]" />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }