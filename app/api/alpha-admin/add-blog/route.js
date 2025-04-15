import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; 
import Blog from "@/models/blog";
import connectToDatabase from "@/lib/db";

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.name !== process.env.ADMIN_USER) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  try {
    await connectToDatabase(); 

    const body = await req.json(); 

    const { title, excerpt, readTime, category, location, image, author } = body;

    if (!title || !excerpt || !readTime || !category || !location || !image || !author) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newBlog = await Blog.create({
      title,
      excerpt,
      readTime,
      category,
      location,
      image,
      author,
    });

    return NextResponse.json({ success: true, data: newBlog });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
