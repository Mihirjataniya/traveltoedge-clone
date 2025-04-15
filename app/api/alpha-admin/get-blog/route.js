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
     
      const blog = await Blog.findById(blogId);
      if (!blog) {
        return NextResponse.json({ error: "Blog not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: blog });
    } else {
      const blogs = await Blog.find();
      return NextResponse.json({ success: true, data: blogs });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
