import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import FormData from "@/models/formData";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.name !== process.env.ADMIN_USER) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  try {
    await connectToDatabase();
    
    // Get search parameters from the URL
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1; 
    const limit = parseInt(searchParams.get('limit')) || 10; 
    
   
    const skip = (page - 1) * limit;
    
   
    const totalCount = await FormData.countDocuments();
   
    const totalPages = Math.ceil(totalCount / limit);
    

    const submissions = await FormData.find()
      .sort({ _id: -1 }) // latest first
      .skip(skip)
      .limit(limit);

   
    return NextResponse.json({ 
      success: true, 
      data: submissions,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalItems: totalCount,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    console.error("GET Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}