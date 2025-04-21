// app/blog/page.js
import Blog from "@/models/blog"; // Mongoose Blog model
import connectToDatabase from "@/lib/db"; // Database connection
import TravelBlog from "@/components/TravelBlog/TravelBlog";

export const revalidate = 900;

// Generate metadata for the page
export async function generateMetadata() {
  return {
    title: 'Travel Blog | Explore Our Adventures',
    description: 'Read about our latest travel adventures, tips, and destinations around the world.',
  };
}

async function getInitialBlogs() {
  await connectToDatabase();
  
  try {
    // Initial blogs fetch - newest first
    const blogs = await Blog.find({})
      .sort({ date: -1 })
      .limit(6)
      .lean();
    
    // Get all categories
    const categories = ["All"].concat(
      [...new Set((await Blog.distinct('category')).filter(Boolean))]
    );
    
    // Count total documents for pagination
    const totalCount = await Blog.countDocuments({});
    
    return {
      blogs: {
        blogs: JSON.parse(JSON.stringify(blogs)),
        pagination: {
          page: 1,
          limit: 6,
          totalCount,
          hasMore: totalCount > 6
        }
      },
      categories
    };
  } catch (error) {
    console.error('Error fetching initial blogs:', error);
    return {
      blogs: {
        blogs: [],
        pagination: {
          page: 1,
          limit: 6,
          totalCount: 0,
          hasMore: false
        }
      },
      categories: ["All", "Adventure", "Food", "Mountains", "Islands", "Wildlife", "History"]
    };
  }
}

export default async function BlogPage() {
  const { blogs, categories } = await getInitialBlogs();
  
  return <TravelBlog initialData={blogs} categories={categories} />;
}