import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // adjust path to your authOptions
import TourPackage from "@/models/tourPackage"; // your mongoose model
import connectToDatabase from "@/lib/db";
import { readSeoFields, isSlugTaken } from "@/lib/seoLookup";

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

    const seo = readSeoFields(body);
    if (seo.slug && (await isSlugTaken(seo.slug))) {
      return NextResponse.json(
        { error: `URL slug "${seo.slug}" is already used by another tour` },
        { status: 409 }
      );
    }

    const newTour = await TourPackage.create({
      ...seo,
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
