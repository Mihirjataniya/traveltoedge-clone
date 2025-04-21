"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Search, MapPin, Calendar, Users, ChevronDown, Filter, Loader } from "lucide-react"
import axios from "axios"

export default function ToursPageClient({ initialTours, categories }) {
  const [tours, setTours] = useState(initialTours || [])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [durationFilter, setDurationFilter] = useState("")
  const [isTopTourOnly, setIsTopTourOnly] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  
  // Use refs to track previous filter values to prevent redundant API calls
  const prevFiltersRef = useRef({ searchQuery, selectedCategory, durationFilter, isTopTourOnly })
  const searchTimeoutRef = useRef(null)
  const isInitialRender = useRef(true)
  
  const durationOptions = [
    { label: "Any Duration", value: "" },
    { label: "1-3 Days", value: "1-3" },
    { label: "4-7 Days", value: "4-7" },
    { label: "7-10 Days", value: "7-10" },
    { label: "10+ Days", value: "10" }
  ]

  // Extract fetch function outside of effects to prevent recreation
  const fetchTours = useCallback(async (resetPage = false) => {
    try {
      setIsLoading(true)
      const currentPage = resetPage ? 1 : page
      
      const { data } = await axios.get('/api/get-tours', {
        params: {
          page: currentPage,
          limit: 6,
          search: searchQuery,
          category: selectedCategory === "All" ? "" : selectedCategory,
          duration: durationFilter,
          isTopTour: isTopTourOnly ? "true" : ""
        }
      })
      
      if (resetPage) {
        setTours(data.tours)
        setPage(1)
      } else {
        setTours(prev => [...prev, ...data.tours])
      }
      
      setHasMore(data.pagination.hasMore)
    } catch (error) {
      console.error("Error fetching tours:", error)
    } finally {
      setIsLoading(false)
    }
  }, [searchQuery, selectedCategory, durationFilter, isTopTourOnly, page])
  
  // Run only once on initial mount to mark component as ready
  useEffect(() => {
    isInitialRender.current = false
    // No need to fetch again as we already have initialTours
  }, [])
  
  // Handle filter changes with proper dependency tracking
  useEffect(() => {
    // Skip initial render since we already have initialTours
    if (isInitialRender.current) return
    
    // Clear any existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }
    
    // Check if filters have actually changed to prevent redundant calls
    const prevFilters = prevFiltersRef.current
    const filtersChanged = 
      prevFilters.searchQuery !== searchQuery ||
      prevFilters.selectedCategory !== selectedCategory ||
      prevFilters.durationFilter !== durationFilter ||
      prevFilters.isTopTourOnly !== isTopTourOnly
    
    if (filtersChanged) {
      // Update ref with current values
      prevFiltersRef.current = { searchQuery, selectedCategory, durationFilter, isTopTourOnly }
      
      // Debounce filter changes
      searchTimeoutRef.current = setTimeout(() => {
        fetchTours(true) // Reset page when filters change
      }, 400)
    }
    
    // Cleanup timeout on unmount or before next effect run
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [searchQuery, selectedCategory, durationFilter, isTopTourOnly, fetchTours])
  
  // Separate effect for page changes (load more functionality)
  useEffect(() => {
    // Skip initial render and page 1 (we already have data)
    if (isInitialRender.current || page === 1) return
    
    fetchTours(false)
  }, [page, fetchTours])
  
  const handleCategoryClick = (category) => {
    if (category !== selectedCategory) {
      setSelectedCategory(category)
    }
  }
  
  const loadMore = () => {
    if (!isLoading && hasMore) {
      setPage(prev => prev + 1)
    }
  }
  
  const resetFilters = () => {
    setSelectedCategory("All")
    setSearchQuery("")
    setDurationFilter("")
    setIsTopTourOnly(false)
  }
  
  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
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
        transition={{ duration: 0.6 }}
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
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Discover Your Perfect Tour
          </motion.h1>
          <motion.p
            className="mt-4 text-xl md:text-2xl max-w-2xl text-center"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Unforgettable experiences await in the world's most breathtaking destinations
          </motion.p>
        </div>
      </motion.div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto -mt-8 relative z-10">
        <motion.div
          className="bg-white rounded-xl shadow-xl p-4 md:p-6"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
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
              <div className="relative">
                <button 
                  onClick={toggleFilters} 
                  className="flex items-center gap-2 px-4 py-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-all"
                >
                  <Calendar className="text-gray-500" size={18} />
                  <span className="hidden md:inline text-gray-700">Duration</span>
                  <ChevronDown size={16} className="text-gray-500" />
                </button>
                {showFilters && (
                  <div className="absolute z-20 mt-2 w-48 bg-white rounded-lg shadow-lg p-2 border border-gray-100">
                    {durationOptions.map(option => (
                      <div 
                        key={option.value} 
                        className={`p-2 hover:bg-gray-50 rounded cursor-pointer ${durationFilter === option.value ? 'bg-gray-100' : ''}`}
                        onClick={() => {
                          setDurationFilter(option.value)
                          setShowFilters(false)
                        }}
                      >
                        {option.label}
                      </div>
                    ))}
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <label className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={isTopTourOnly} 
                          onChange={() => setIsTopTourOnly(!isTopTourOnly)} 
                          className="mr-2"
                        />
                        Top Tours Only
                      </label>
                    </div>
                  </div>
                )}
              </div>
              <button 
                onClick={resetFilters}
                className="flex items-center gap-2 px-4 py-3 bg-[#03435e] text-white rounded-lg hover:bg-blue-700 transition-all"
              >
                <Filter size={18} />
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
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category ? "bg-[#03435e] text-white" : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => handleCategoryClick(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Tours Grid */}
      <div className="max-w-7xl mx-auto py-8">
        <motion.h2
          className="text-3xl font-bold text-[#03435E] mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {selectedCategory === "All" ? "Popular Tours" : `${selectedCategory} Tours`}
          {isTopTourOnly && " - Top Rated"}
        </motion.h2>

        {isLoading && tours.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {tours.length > 0 ? (
              tours.map((tour) => <TourCard key={tour._id} tour={tour} />)
            ) : (
              <div className="col-span-3 text-center py-8">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                  <p className="text-xl text-gray-600">No tours found matching your criteria.</p>
                  <button
                    className="mt-4 px-6 py-2 bg-[#03435e] text-white rounded-lg hover:bg-blue-700 transition-all"
                    onClick={resetFilters}
                  >
                    Reset filters
                  </button>
                </motion.div>
              </div>
            )}
          </motion.div>
        )}
        
        {/* Load More Button */}
        {hasMore && tours.length > 0 && (
          <div className="flex justify-center mt-8">
            <motion.button
              className="px-6 py-3 bg-[#03435e] text-white rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2"
              onClick={loadMore}
              disabled={isLoading}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {isLoading ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  Loading...
                </>
              ) : (
                'Load More Tours'
              )}
            </motion.button>
          </div>
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
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -3 }}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={tour.image || "/placeholder.svg"}
          alt={tour.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 right-4 bg-white backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-semibold text-[#03435E]">
          {tour.category}
        </div>
        {tour.isTopTour && (
          <div className="absolute top-4 left-4 bg-yellow-400 px-2 py-1 rounded-lg text-sm font-semibold text-gray-900">
            Top Tour
          </div>
        )}
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
          {tour.rating > 0 && (
            <div className="flex items-center gap-1">
              <div className="flex">
                {[...Array(Math.floor(tour.rating))].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
                {tour.rating % 1 > 0 && <span className="text-yellow-400">½</span>}
              </div>
              <span>{tour.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-[#03435E]">₹ {tour.price}</span>
            <span className="text-gray-500 text-sm"> / person</span>
          </div>
          <a href={tour.itinerary} target="_blank" rel="noopener noreferrer">
            <motion.button
              className="px-4 py-2 bg-[#03435e] text-white rounded-lg hover:bg-[#03435E] transition-all"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              View Details
            </motion.button>
          </a>
        </div>
      </div>
    </motion.div>
  )
}