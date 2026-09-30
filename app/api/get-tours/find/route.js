import { NextResponse } from "next/server";
import TourPackage from "@/models/tourPackage";
import connectToDatabase from "@/lib/db";
import { findTourBySlug } from "@/lib/tourLookup";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const title = searchParams.get("title");

  if (!slug && !title) {
    return NextResponse.json({ error: "slug or title is required" }, { status: 400 });
  }

  try {
    await connectToDatabase();

    // Prefer slug (custom slug, then title-derived); fall back to exact title.
    const tour = slug
      ? await findTourBySlug(slug)
      : await TourPackage.findOne({ title: new RegExp(`^${title}$`, "i") });
    if (!tour) {
      return NextResponse.json({ error: "Tour not found" }, { status: 404 });
    }
    return NextResponse.json(tour);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
