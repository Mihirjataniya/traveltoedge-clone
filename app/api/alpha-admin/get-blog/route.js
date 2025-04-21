import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Blog from "@/models/blog"; 
import connectToDatabase from "@/lib/db";

export async function GET(req) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.name !== process.env.ADMIN_USER) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url); 
    const blogId = searchParams.get('id');
    
    if (blogId) {
      // If ID is provided, return a single blog post
      const blog = await Blog.findById(blogId);
      if (!blog) {
        return NextResponse.json({ error: "Blog not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: blog });
    } else {
      // Pagination implementation
      const page = parseInt(searchParams.get('page')) || 1; // Default to page 1
      const limit = 10; // Fixed limit of 10 items per page
      const skip = (page - 1) * limit;
      
      // Get total count for pagination metadata
      const totalBlogs = await Blog.countDocuments();
      const totalPages = Math.ceil(totalBlogs / limit);
      
      // Get paginated blogs
      const blogs = await Blog.find()
        .sort({ createdAt: -1 }) // Sort by newest first
        .skip(skip)
        .limit(limit);
      
      return NextResponse.json({ 
        success: true, 
        data: blogs,
        pagination: {
          totalItems: totalBlogs,
          totalPages: totalPages,
          currentPage: page,
          itemsPerPage: limit,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        }
      });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}