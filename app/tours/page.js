"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, MapPin, Calendar, Users, ChevronDown, Filter } from "lucide-react"

export default function ToursPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const categories = ["All", "Beach", "Mountain", "City", "Adventure", "Cultural"]

  const tours = [
    {
      id: 1,
      title: "Santorini Island Escape",
      location: "Greece",
      duration: "7 days",
      price: 1299,
      rating: 4.8,
      reviews: 124,
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2574&auto=format&fit=crop",
      category: "Beach",
    },
    {
      id: 2,
      title: "Swiss Alps Adventure",
      location: "Switzerland",
      duration: "5 days",
      price: 1499,
      rating: 4.9,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?q=80&w=2670&auto=format&fit=crop",
      category: "Mountain",
    },
    {
      id: 3,
      title: "Tokyo City Explorer",
      location: "Japan",
      duration: "6 days",
      price: 1799,
      rating: 4.7,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=2574&auto=format&fit=crop",
      category: "City",
    },
    {
      id: 4,
      title: "Amazon Rainforest Expedition",
      location: "Brazil",
      duration: "8 days",
      price: 2199,
      rating: 4.6,
      reviews: 78,
      image: "https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?q=80&w=2670&auto=format&fit=crop",
      category: "Adventure",
    },
    {
      id: 5,
      title: "Kyoto Cultural Tour",
      location: "Japan",
      duration: "5 days",
      price: 1599,
      rating: 4.9,
      reviews: 112,
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2670&auto=format&fit=crop",
      category: "Cultural",
    },
    {
      id: 6,
      title: "Bali Paradise Retreat",
      location: "Indonesia",
      duration: "10 days",
      price: 1899,
      rating: 4.8,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2538&auto=format&fit=crop",
      category: "Beach",
    },
  ]

  const filteredTours = tours.filter(
    (tour) =>
      (selectedCategory === "All" || tour.category === selectedCategory) &&
      (tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.location.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <div className="w-full min-h-screen mt-24">
      {/* Hero Section */}
      <motion.div
        className="relative h-[40vh] md:h-[50vh] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Beautiful travel destinations"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white p-4">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-center"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Discover Your Perfect Tour
          </motion.h1>
          <motion.p
            className="mt-4 text-xl md:text-2xl max-w-2xl text-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Unforgettable experiences await in the world's most breathtaking destinations
          </motion.p>
        </div>
      </motion.div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto -mt-8 relative z-10">
        <motion.div
          className="bg-white rounded-xl shadow-xl p-4 md:p-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search destinations, tours..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 md:gap-4">
              <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-all">
                  <Calendar className="text-gray-500" size={18} />
                  <span className="hidden md:inline text-gray-700">Duration</span>
                  <ChevronDown size={16} className="text-gray-500" />
                </button>
                <div className="absolute z-20 hidden group-hover:block mt-2 w-48 bg-white rounded-lg shadow-lg p-2 border border-gray-100">
                  <div className="p-2 hover:bg-gray-50 rounded cursor-pointer">1-3 days</div>
                  <div className="p-2 hover:bg-gray-50 rounded cursor-pointer">4-7 days</div>
                  <div className="p-2 hover:bg-gray-50 rounded cursor-pointer">8+ days</div>
                </div>
              </div>
              <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-all">
                  <Users className="text-gray-500" size={18} />
                  <span className="hidden md:inline text-gray-700">Guests</span>
                  <ChevronDown size={16} className="text-gray-500" />
                </button>
                <div className="absolute z-20 hidden group-hover:block mt-2 w-48 bg-white rounded-lg shadow-lg p-2 border border-gray-100">
                  <div className="p-2 hover:bg-gray-50 rounded cursor-pointer">1-2 people</div>
                  <div className="p-2 hover:bg-gray-50 rounded cursor-pointer">3-5 people</div>
                  <div className="p-2 hover:bg-gray-50 rounded cursor-pointer">6+ people</div>
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-3 bg-[#03435e] text-white rounded-lg hover:bg-blue-700 transition-all">
                <Filter size={18} />
                <span className="hidden md:inline">Filters</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto mt-8">
        <motion.div
          className="flex flex-wrap gap-2 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category ? "bg-[#03435e] text-white" : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Tours Grid */}
      <div className="max-w-7xl mx-auto py-12">
        <motion.h2
          className="text-3xl font-bold text-[#03435E] mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          {selectedCategory === "All" ? "Popular Tours" : `${selectedCategory} Tours`}
        </motion.h2>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-white rounded-xl overflow-hidden shadow-lg h-[400px] animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-5 space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-10 bg-gray-200 rounded w-full mt-6"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredTours.length > 0 ? (
              filteredTours.map((tour) => <TourCard key={tour.id} tour={tour} />)
            ) : (
              <div className="col-span-3 text-center py-12">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                  <p className="text-xl text-gray-600">No tours found matching your criteria.</p>
                  <button
                    className="mt-4 px-6 py-2 bg-[#03435e] text-white rounded-lg hover:bg-blue-700 transition-all"
                    onClick={() => {
                      setSelectedCategory("All")
                      setSearchQuery("")
                    }}
                  >
                    Reset filters
                  </button>
                </motion.div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}

function TourCard({ tour }) {
  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -5 }}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={tour.image || "/placeholder.svg"}
          alt={tour.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-white backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-semibold text-[#03435E]">
          {tour.category}
        </div>
      </div>
      <div className="p-5">
        
        <h3 className="font-bold text-xl mb-2 text-gray-900">{tour.title}</h3>
        <div className="flex items-center gap-1 text-gray-600 mb-3">
          <MapPin size={16} />
          <span>{tour.location}</span>
        </div>
        <div className="flex items-center gap-4 text-gray-600 mb-5">
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            <span>{tour.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={16} />
            <span>2-10 people</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-[#03435E]">${tour.price}</span>
            <span className="text-gray-500 text-sm"> / person</span>
          </div>
          <Link href={`/tours/${tour.id}`}>
            <motion.button
              className="px-4 py-2 bg-[#03435e] text-white rounded-lg hover:bg-[#03435E] transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Details
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
