import Image from "next/image"
import Link from "next/link"
import {
    CalendarIcon,
    Clock,
    MapPin,
    Share2,
    Facebook,
    Twitter,
    Bookmark,
    ChevronLeft,
    ChevronRight,
    Mail,
} from "lucide-react"

export default function BlogPost() {
    // Sample blog data
    const blog = {
        id: 1,
        title: "Hidden Gems of Bali: Beyond the Tourist Trails",
        excerpt: "Discover the untouched beauty of Bali's secret locations that most travelers never see.",
        content: [
            "The island of Bali has long been a favorite destination for travelers seeking sun, surf, and spiritual experiences. But beyond the crowded beaches of Kuta and the bustling streets of Ubud lies a different Bali—one of hidden waterfalls, secret beaches, and authentic cultural experiences far from the tourist crowds.",
            "My journey to discover these hidden gems began three months ago when I decided to extend what was supposed to be a two-week vacation into a three-month exploration. Armed with nothing but a rented scooter, a basic map, and recommendations from locals, I set out to discover the Bali that most tourists never see.",
        ],
        date: "April 10, 2025",
        readTime: "8 min read",
        category: "Adventure",
        location: "Bali, Indonesia",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        author: {
            name: "Emma Rodriguez",
            //   avatar: "/images/avatar-1.jpg",
            bio: "Travel writer and photographer with a passion for off-the-beaten-path destinations. Has visited 45 countries across 6 continents.",
        },
        relatedPosts: [
            {
                id: 2,
                title: "A Week in the Swiss Alps: Hiking and Chocolate",
                image: "https://images.unsplash.com/photo-1662278525247-c1d0ff9c1aa5?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                category: "Mountains",
            },
            {
                id: 3,
                title: "Street Food Tour: The Flavors of Bangkok",
                image: "https://images.unsplash.com/photo-1493863438658-3e7743ac61cd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                category: "Food",
            },
            {
                id: 5,
                title: "Island Hopping in Greece: A Summer Odyssey",
                image: "https://images.unsplash.com/photo-1695441396429-0c53cf57c29b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                category: "Islands",
            },
        ],
    }

    return (
        <div className="w-full min-h-screen mt-24">
            {/* Hero section */}
            <div className="relative h-[50vh] w-full overflow-hidden md:h-[70vh]">
                <Image src={blog.image || "/placeholder.svg"} alt={blog.title} fill className="object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-6 text-white md:p-12">
                    <div className="container mx-auto max-w-4xl">
                        <span className="mb-3 inline-block rounded-full bg-white text-[#03435e] px-3 py-1 text-xs font-semibold">
                            {blog.category}
                        </span>
                        <h1 className="mb-4 text-3xl font-bold leading-tight md:text-5xl">{blog.title}</h1>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-white/80 md:gap-6">
                            <div className="flex items-center gap-2">
                                <CalendarIcon className="h-4 w-4" />
                                <span>{blog.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span>{blog.readTime}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span>{blog.location}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-6xl px-4 py-8">
                {/* Author and share section */}
                <div className="mb-8 flex flex-col justify-between gap-4 border-b border-gray-200 pb-8 md:flex-row md:items-center">
                    <div className="flex items-center gap-4">
                        <div>
                            <p className="font-medium">Written by</p>
                            <h3 className="text-lg font-bold">{blog.author.name}</h3>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">Share:</span>
                        <button className="rounded-full bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-gray-200">
                            <Facebook className="h-4 w-4" />
                        </button>
                        <button className="rounded-full bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-gray-200">
                            <Twitter className="h-4 w-4" />
                        </button>
                        <button className="rounded-full bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-gray-200">
                            <Share2 className="h-4 w-4" />
                        </button>
                        <button className="rounded-full bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-gray-200">
                            <Bookmark className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                {/* Main content */}
                <div className="prose max-w-none">
                    <p className="text-xl font-medium leading-relaxed text-gray-700">{blog.excerpt}</p>

                    <p className="my-6">{blog.content[0]}</p>

                    <div className="my-8 rounded-xl bg-amber-50 p-6 italic">
                        <p className="text-lg font-medium text-amber-800">
                            "The true essence of Bali isn't found in the tourist hotspots, but in the quiet villages, hidden temples,
                            and untouched natural wonders that require a bit of effort to discover."
                        </p>
                    </div>

                    <p className="my-6">{blog.content[1]}</p>

                    <h2 className="mb-4 mt-8 text-2xl font-bold">The Secret Beaches of North Bali</h2>

                    <div className="my-6 aspect-video overflow-hidden rounded-xl">
                        <Image
                            src="/images/bali-beach.jpg"
                            alt="Secret beach in North Bali"
                            width={800}
                            height={450}
                            className="h-full w-full object-cover"
                        />
                    </div>

                    <p className="my-6">
                        While southern beaches like Kuta and Seminyak draw crowds of tourists, the northern coast remains largely
                        unexplored. Here, black sand beaches stretch for miles without another soul in sight. The waters are calm
                        and clear, perfect for snorkeling among vibrant coral reefs teeming with marine life.
                    </p>

                    <p className="my-6">
                        One particular gem is Sing Sing Beach, a small cove protected by dramatic cliffs. To reach it, you'll need
                        to descend a series of stone steps carved into the hillside—a journey that deters most casual tourists. Your
                        reward is a pristine beach where the only footprints in the sand might be your own.
                    </p>

                    <h2 className="mb-4 mt-8 text-2xl font-bold">Hidden Waterfalls of Central Bali</h2>

                    <p className="my-6">
                        The interior of Bali hides dozens of waterfalls, many of which don't appear in guidebooks. While tourists
                        flock to Gitgit and Tegenungan, locals pointed me toward lesser-known cascades that required treks through
                        rice fields and jungle paths.
                    </p>

                    <div className="my-8 grid gap-4 sm:grid-cols-2">
                        <div className="aspect-square overflow-hidden rounded-lg">
                            <Image
                                src="/images/bali-waterfall-1.jpg"
                                alt="Hidden waterfall in Bali"
                                width={400}
                                height={400}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="aspect-square overflow-hidden rounded-lg">
                            <Image
                                src="/images/bali-waterfall-2.jpg"
                                alt="Secret waterfall in Bali jungle"
                                width={400}
                                height={400}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>

                    <p className="my-6">
                        Tukad Cepung is perhaps the most magical of these hidden waterfalls. Unlike most cascades, it's enclosed
                        within a cave, with sunlight streaming through an opening in the canopy above, creating ethereal light beams
                        when conditions are right. To reach it, you'll wade through a shallow river and squeeze between rock
                        walls—an adventure in itself.
                    </p>

                    <div className="my-8 rounded-xl bg-gray-100 p-6">
                        <h3 className="mb-3 text-xl font-bold">Traveler's Tips:</h3>
                        <ul className="list-disc space-y-2 pl-5">
                            <li>Rent a scooter for maximum flexibility—most hidden spots are inaccessible by public transport</li>
                            <li>Start your days early to avoid both the heat and any potential crowds</li>
                            <li>Always carry cash as most remote areas won't accept cards</li>
                            <li>
                                Learn a few basic Indonesian phrases—locals appreciate the effort and may share their secret spots
                            </li>
                            <li>Pack a reusable water bottle and reef-safe sunscreen to minimize your environmental impact</li>
                        </ul>
                    </div>

                    <h2 className="mb-4 mt-8 text-2xl font-bold">Authentic Cultural Experiences</h2>

                    <p className="my-6">
                        Beyond natural wonders, Bali's cultural heritage offers rich experiences for those willing to venture beyond
                        tourist performances. In remote villages, ceremonies and rituals continue as they have for centuries, not as
                        performances for tourists but as living traditions.
                    </p>

                    <p className="my-6">
                        In the mountain village of Sidemen, I was invited to join a local family for their temple ceremony. Dressed
                        in traditional attire they lent me, I participated in rituals that few tourists ever witness. The genuine
                        warmth and openness of the Balinese people transformed what could have been mere observation into meaningful
                        cultural exchange.
                    </p>
                </div>


                {/* Newsletter signup */}
                <div className="my-12 rounded-xl bg-[#03435e] p-8 text-white">
                    <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
                        <div className="md:flex-1">
                            <h3 className="mb-2 text-2xl font-bold">Subscribe to our Travel Newsletter</h3>
                            <p className="text-amber-100">
                                Get weekly updates on hidden destinations, travel tips, and exclusive content delivered straight to your
                                inbox.
                            </p>
                        </div>
                        <div className="w-full md:w-auto">
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="w-full rounded-md px-4 py-3 text-gray-500 placeholder-gray-500 outline-none border-2 sm:w-64"
                                />
                                <button className="flex items-center justify-center gap-2 rounded-md bg-gray-900 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-800">
                                    <Mail className="h-4 w-4" />
                                    <span>Subscribe</span>
                                </button>
                            </div>
                            <p className="mt-2 text-xs text-amber-100">We respect your privacy. Unsubscribe at any time.</p>
                        </div>
                    </div>
                </div>

                {/* Related posts */}
                <div className="my-12">
                    <h2 className="mb-6 text-2xl font-bold">You might also enjoy</h2>
                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                        {blog.relatedPosts.map((post) => (
                            <div
                                key={post.id}
                                className="overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-lg"
                            >
                                <div className="relative aspect-video overflow-hidden">
                                    <Image
                                        src={post.image || "/placeholder.svg"}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-300 hover:scale-105"
                                    />
                                    <span className="absolute left-3 top-3 rounded-full text-[#03435e] px-2 py-1 text-xs font-semibold bg-white">
                                        {post.category}
                                    </span>
                                </div>
                                <div className="p-4">
                                    <h3 className="line-clamp-2 text-lg font-bold">{post.title}</h3>
                                    <Link href="#" className="mt-2 inline-block text-sm font-bold underline text-[#03435e] hover:text-amber-600">
                                        Read article
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation */}
                <div className="my-8 flex items-center justify-between border-t border-gray-200 pt-8">
                    <Link href="#" className="flex items-center gap-2 text-gray-600 transition-colors hover:text-[#03435e]">
                        <ChevronLeft className="h-4 w-4" />
                        <span>Previous article</span>
                    </Link>
                    <Link
                        href="/blogs"
                        className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-50"
                    >
                        All articles
                    </Link>
                    <Link href="#" className="flex items-center gap-2 text-gray-600 transition-colors hover:text-[#03435e]">
                        <span>Next article</span>
                        <ChevronRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </div>
    )
}
