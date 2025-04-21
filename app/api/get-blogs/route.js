// app/api/blogs/route.ts
import { NextResponse } from 'next/server';
import Blog from "@/models/blog"; 
import connectToDatabase from "@/lib/db";


export async function GET(request) {
  try {

    await connectToDatabase();
    
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '6');
    const category = searchParams.get('category') || null;
    
    
    const skip = (page - 1) * limit;
   
    let query = {};
    if (category) {
      query = { category };
    }
  
    const totalCount = await Blog.countDocuments(query);
    

    const blogs = await Blog.find(query)
      .sort({ date: -1 }) 
      .skip(skip)
      .limit(limit)
      .lean(); 
   
    const hasMore = skip + blogs.length < totalCount;
    
    return NextResponse.json({
      blogs,
      pagination: {
        page,
        limit,
        totalCount,
        hasMore
      }
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}