import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // adjust path to your authOptions
import TourPackage from "@/models/tourPackage"; // your mongoose model
import connectToDatabase from "@/lib/db";

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.name !== process.env.ADMIN_USER) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();

    const body = await req.json();
    const {
      title,
      location,
      duration,
      price,
      rating,
      image,
      coverImage,
      coverImages,
      category,
      tourType,
      itinerary,
      content,
      isTopTour
    } = body;

    if (!title || !location || !duration || !price) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newTour = await TourPackage.create({
      title,
      location,
      duration,
      price,
      rating,
      image,
      coverImage,
      coverImages,
      category,
      tourType,
      itinerary,
      content,
      isTopTour
    });

    return NextResponse.json({ success: true, data: newTour });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
