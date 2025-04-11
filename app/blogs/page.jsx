import Image from "next/image"
import { CalendarIcon, Clock, MapPin } from "lucide-react"

export default function TravelBlog() {
    // Sample blog data
    const blogs = [
        {
            id: 1,
            title: "Hidden Gems of Bali: Beyond the Tourist Trails",
            excerpt: "Discover the untouched beauty of Bali's secret locations that most travelers never see.",
            date: "April 10, 2025",
            readTime: "8 min read",
            category: "Adventure",
            location: "Bali, Indonesia",
            image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            author: {
                name: "Emma Rodriguez",
                // avatar: "/images/avatar-1.jpg",
            },
        },
        {
            id: 2,
            title: "A Week in the Swiss Alps: Hiking and Chocolate",
            excerpt: "My journey through picturesque mountain villages and indulging in Switzerland's finest chocolates.",
            date: "April 5, 2025",
            readTime: "6 min read",
            category: "Mountains",
            location: "Swiss Alps, Switzerland",
            image: "https://images.unsplash.com/photo-1662278525247-c1d0ff9c1aa5?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            author: {
                name: "Michael Chen",
                // avatar: "/images/avatar-2.jpg",
            },
        },
        {
            id: 3,
            title: "Street Food Tour: The Flavors of Bangkok",
            excerpt: "A culinary adventure through the vibrant street markets of Thailand's bustling capital.",
            date: "March 28, 2025",
            readTime: "5 min read",
            category: "Food",
            location: "Bangkok, Thailand",
            image: "https://images.unsplash.com/photo-1493863438658-3e7743ac61cd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            author: {
                name: "Sarah Johnson",
                // avatar: "/images/avatar-3.jpg",
            },
        },
        {
            id: 4,
            title: "Ancient Wonders: Exploring Petra by Moonlight",
            excerpt: "The magical experience of visiting Jordan's rose-colored city under the stars.",
            date: "March 20, 2025",
            readTime: "7 min read",
            category: "History",
            location: "Petra, Jordan",
            image: "https://images.unsplash.com/photo-1579606032821-4e6161c81bd3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            author: {
                name: "David Williams",
                // avatar: "/images/avatar-4.jpg",
            },
        },
        {
            id: 5,
            title: "Island Hopping in Greece: A Summer Odyssey",
            excerpt: "From Santorini to Mykonos, exploring the best of the Greek islands in two unforgettable weeks.",
            date: "March 15, 2025",
            readTime: "9 min read",
            category: "Islands",
            location: "Greek Islands, Greece",
            image: "https://images.unsplash.com/photo-1695441396429-0c53cf57c29b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            author: {
                name: "Olivia Parker",
                // avatar: "/images/avatar-5.jpg",
            },
        },
        {
            id: 6,
            title: "Safari Adventures: Wildlife Encounters in Tanzania",
            excerpt: "Up close with the Big Five in the Serengeti and witnessing the Great Migration.",
            date: "March 8, 2025",
            readTime: "10 min read",
            category: "Wildlife",
            location: "Serengeti, Tanzania",
            image: "https://images.unsplash.com/photo-1633824489397-7becc7c54fb2?q=80&w=2026&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            author: {
                name: "James Thompson",
                // avatar: "/images/avatar-6.jpg",
            },
        },
    ]

    // Featured blog is the newest one (first in the array)
    const featuredBlog = blogs[0]
    const regularBlogs = blogs.slice(1)

    return (
        <div className="w-full min-h-screen mt-16">
            <div className="container mx-auto px-4 py-8 sm:py-12">
                {/* Section Header */}
                <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h2 className="text-xl sm:text-2xl text-[#03435e] font-semibold">
                        Latest Adventures
                    </h2>
                    <div className="flex flex-wrap items-center gap-2 sm:justify-start justify-center">
                        <button className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50">
                            All
                        </button>
                        <button className="rounded-md px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100">
                            Adventure
                        </button>
                        <button className="rounded-md px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100">
                            Food
                        </button>
                        <button className="rounded-md px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100">
                            Culture
                        </button>
                    </div>

                </div>

                {/* Featured Blog */}
                <div className="mb-10 sm:mb-16">
                    <div className="overflow-hidden rounded-xl bg-white shadow-lg">
                        <div className="grid gap-6 md:grid-cols-2">
                            {/* Image */}
                            <div className="relative aspect-video md:aspect-auto md:h-full overflow-hidden">
                                <Image
                                    src={featuredBlog.image || "/placeholder.svg"}
                                    alt={featuredBlog.title}
                                    fill
                                    className="object-cover transition-transform duration-300 hover:scale-105"
                                    priority
                                />
                                <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-bold text-[#03435e]">
                                    {featuredBlog.category}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="flex flex-col justify-center p-5 sm:p-6">
                                <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <CalendarIcon className="h-4 w-4" />
                                        <span>{featuredBlog.date}</span>
                                    </div>
                                    <span>•</span>
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        <span>{featuredBlog.readTime}</span>
                                    </div>
                                </div>
                                <h3 className="mb-2 text-xl sm:text-3xl font-bold">
                                    {featuredBlog.title}
                                </h3>
                                <div className="mb-3 flex items-center gap-1 text-sm text-gray-500">
                                    <MapPin className="h-4 w-4" />
                                    <span>{featuredBlog.location}</span>
                                </div>
                                <p className="mb-6 text-gray-600">{featuredBlog.excerpt}</p>
                                <div className="flex items-center justify-between flex-wrap gap-4">
                                    <span className="text-sm font-medium">{featuredBlog.author.name}</span>
                                    <button className="rounded-md bg-[#03435E] px-4 py-2 font-medium text-white transition-colors hover:bg-amber-600">
                                        Read More
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Blog Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {regularBlogs.map((blog) => (
                        <div
                            key={blog.id}
                            className="overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-lg"
                        >
                            <div className="relative aspect-video overflow-hidden">
                                <Image
                                    src={blog.image || "/placeholder.svg"}
                                    alt={blog.title}
                                    fill
                                    className="object-cover transition-transform duration-300 hover:scale-105"
                                />
                                <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-bold text-[#03435e]">
                                    {blog.category}
                                </span>
                            </div>
                            <div className="p-5">
                                <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <CalendarIcon className="h-3 w-3" />
                                        <span>{blog.date}</span>
                                    </div>
                                    <span>•</span>
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        <span>{blog.readTime}</span>
                                    </div>
                                </div>
                                <h3 className="mb-1 line-clamp-2 text-base sm:text-lg font-bold">
                                    {blog.title}
                                </h3>
                                <div className="mb-2 flex items-center gap-1 text-xs text-gray-500">
                                    <MapPin className="h-3 w-3" />
                                    <span>{blog.location}</span>
                                </div>
                                <p className="mb-4 line-clamp-3 text-sm text-gray-600">
                                    {blog.excerpt}
                                </p>
                                <div className="flex items-center justify-between flex-wrap gap-2">
                                    <span className="text-xs font-medium">{blog.author.name}</span>
                                    <button className="text-sm font-bold text-[#03435E] underline">
                                        Read More
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Load More Button */}
                <div className="mt-10 flex justify-center">
                    <button className="rounded-md border border-[#03435e] px-6 py-2 text-[#03435E] font-bold transition-colors hover:bg-amber-50">
                        Load More
                    </button>
                </div>
            </div>
        </div>

    )
}
