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
      const tours = await tourPackage.find();
      return NextResponse.json({ success: true, data: tours });
    }
  } catch (err) {
    console.error("Error fetching tour(s):", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
