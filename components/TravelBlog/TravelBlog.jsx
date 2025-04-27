'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import { CalendarIcon, Clock, MapPin } from "lucide-react";
import { useRouter } from 'next/navigation';

export default function TravelBlog({ initialData, categories: initialCategories }) {
  const [blogs, setBlogs] = useState(initialData?.blogs || []);
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(initialData?.pagination || {
    page: 1,
    limit: 6,
    totalCount: 0,
    hasMore: false
  });
  const [activeCategory, setActiveCategory] = useState('All');
  const [error, setError] = useState(null);

  // Categories for filter buttons - use the ones from the server if available
  const categories = initialCategories || ['All', 'Adventure', 'Food', 'Mountains', 'Islands', 'Wildlife', 'History'];

  // Handle category filter click
  const handleCategoryClick = async (category) => {
    setActiveCategory(category);
    setLoading(true);
    
    try {
      const response = await fetchBlogs(category);
      setBlogs(response.blogs);
      setPagination(response.pagination);
    } catch (err) {
      setError('Failed to fetch blogs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle loading more posts
  const loadMorePosts = async () => {
    if (loading || !pagination.hasMore) return;
    
    setLoading(true);
    
    try {
      const nextPage = pagination.page + 1;
      const response = await fetchBlogs(
        activeCategory !== 'All' ? activeCategory : null, 
        nextPage
      );
      
      setBlogs(prevBlogs => [...prevBlogs, ...response.blogs]);
      setPagination(response.pagination);
    } catch (err) {
      setError('Failed to load more blogs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Client-side fetch function
  async function fetchBlogs(category = null, page = 1, limit = 6) {
    // Build URL with query parameters
    const url = new URL('/api/get-blogs', window.location.origin);
    url.searchParams.append('page', page.toString());
    url.searchParams.append('limit', limit.toString());
    if (category && category !== 'All') {
      url.searchParams.append('category', category);
    }

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return await response.json();
  }

  // Get featured blog (first blog) and regular blogs
  const featuredBlog = blogs.length > 0 ? blogs[0] : null;
  const regularBlogs = blogs.length > 1 ? blogs.slice(1) : [];

  // Show placeholder if no blogs
  if (blogs.length === 0 && !loading) {
    return (
      <div className="w-full min-h-screen mt-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-700">No blogs found</h2>
          <p className="text-gray-500 mt-2">Try selecting a different category or check back later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen mt-16 px-6 md:px-10 xl:px-24">
      <div className="container mx-auto py-8 sm:py-12">
        {/* Section Header */}
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl sm:text-2xl text-[#03435e] font-semibold">
            Latest Adventures
          </h2>
          
          {/* Category filters */}
          <div className="flex flex-wrap items-center gap-2 sm:justify-start justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className={`rounded-md ${
                  activeCategory === category
                    ? "border border-gray-300 bg-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                } px-4 py-2 text-sm font-medium`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
            <p>{error}</p>
          </div>
        )}

        {/* Loading indicator for initial load */}
        {loading && blogs.length === 0 && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#03435E]"></div>
          </div>
        )}

        {/* Featured Blog */}
        {featuredBlog && (
          <div className="mb-10 sm:mb-16">
            <div className="overflow-hidden rounded-xl bg-white shadow-lg">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Image */}
                <div className="relative aspect-video md:aspect-auto md:h-full overflow-hidden">
                  <Image
                    src={featuredBlog.image || "/api/placeholder/800/600"}
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
                      <span>{new Date(featuredBlog.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{featuredBlog.readTime || `${Math.ceil(featuredBlog.excerpt.length / 200)} min read`}</span>
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
                    <span className="text-sm font-medium">{featuredBlog.author}</span>
                    <button onClick={()=>{
                       router.push(`/blogs/${featuredBlog.title.replace(/\s+/g, "_")}`)
                    }}  className="rounded-md bg-[#03435E] px-4 py-2 font-medium text-white transition-colors hover:bg-amber-600">
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {regularBlogs.map((blog) => (
            <div
              key={blog._id || blog.id}
              className="overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-lg"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={blog.image || "/api/placeholder/400/300"}
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
                    <span>{new Date(blog.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{blog.readTime || `${Math.ceil(blog.excerpt.length / 200)} min read`}</span>
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
                  <span className="text-xs font-medium">{blog.author || 'Anonymous'}</span>
                  <button onClick={()=>{
                     router.push(`/blogs/${blog.title.replace(/\s+/g, "_")}`)
                  }} className="text-sm font-bold text-[#03435E] underline">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {pagination.hasMore && (
          <div className="mt-10 flex justify-center">
            <button 
              className="rounded-md border border-[#03435e] px-6 py-2 text-[#03435E] font-bold transition-colors hover:bg-amber-50 disabled:opacity-50"
              onClick={loadMorePosts}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center">
                  <span className="animate-spin h-4 w-4 mr-2 border-t-2 border-b-2 border-[#03435E] rounded-full"></span>
                  Loading...
                </span>
              ) : (
                'Load More'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}