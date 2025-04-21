import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Blog from "@/models/blog"; 
import connectToDatabase from "@/lib/db";

export async function GET(req) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url); 
    const blogId = searchParams.get('id');
    
    if (!blogId) {
      return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
    }
    
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: blog });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// Update a blog post
export async function PUT(req) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.name !== process.env.ADMIN_USER) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(req.url);
    const blogId = searchParams.get('id');
    
    if (!blogId) {
      return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
    }
    
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    
    const data = await req.json();
    
    // Validate required fields
    if (!data.title || !data.content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }
    
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      {
        title: data.title,
        content: data.content,
        excerpt: data.excerpt,
        tags: data.tags,
        imageUrl: data.imageUrl,
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    );
    
    return NextResponse.json({ 
      success: true, 
      message: "Blog updated successfully", 
      data: updatedBlog 
    });
    
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// Delete a blog post
export async function DELETE(req) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.name !== process.env.ADMIN_USER) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(req.url);
    const blogId = searchParams.get('id');
    
    if (!blogId) {
      return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
    }
    
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    
    await Blog.findByIdAndDelete(blogId);
    
    return NextResponse.json({ 
      success: true, 
      message: "Blog deleted successfully" 
    });
    
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}