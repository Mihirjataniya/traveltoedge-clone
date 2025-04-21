import { NextResponse } from "next/server";
import Blog from "@/models/blog"; 
import connectToDatabase from "@/lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");

  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  try {
    await connectToDatabase();
    const blog = await Blog.findOne({ title: new RegExp(`^${title}$`, "i") }); 
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json(blog);
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
