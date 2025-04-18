import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Update the path if different
import tourPackage from "@/models/tourPackage"; // Mongoose Tour model
import connectToDatabase from "@/lib/db"; // Database connection

export async function GET(req) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.name !== process.env.ADMIN_USER) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const tourId = searchParams.get("id");

    if (tourId) {
      const tour = await tourPackage.findById(tourId);
      if (!tour) {
        return NextResponse.json({ error: "Tour not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: tour });
    } else {
      // Pagination parameters
      const page = parseInt(searchParams.get("page") || "1", 10);
      const limit = parseInt(searchParams.get("limit") || "10", 10);
      const skip = (page - 1) * limit;
      
      // Get total count for pagination metadata
      const totalCount = await tourPackage.countDocuments();
      const totalPages = Math.ceil(totalCount / limit);
      
      // Fetch paginated results
      const tours = await tourPackage.find()
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }); // Optional: sort by creation date, newest first
      
      return NextResponse.json({ 
        success: true, 
        data: tours,
        pagination: {
          total: totalCount,
          page,
          limit,
          totalPages,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        }
      });
    }
  } catch (err) {
    console.error("Error fetching tour(s):", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}