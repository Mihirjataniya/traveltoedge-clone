import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import tourPackage from "@/models/tourPackage";
import connectToDatabase from "@/lib/db";

// GET handler to fetch a specific tour by ID
export async function GET(req, { params }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.name !== process.env.ADMIN_USER) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
     const tourId = params.id;

    if (!tourId) {
      return NextResponse.json({ error: "Tour ID is required" }, { status: 400 });
    }

    const tour = await tourPackage.findById(tourId);

    if (!tour) {
      return NextResponse.json({ error: "Tour not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: tour });
  } catch (err) {
    console.error("Error fetching tour:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// PUT handler to update a specific tour by ID
export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.name !== process.env.ADMIN_USER) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
     const tourId = params.id;

    if (!tourId) {
      return NextResponse.json({ error: "Tour ID is required" }, { status: 400 });
    }

    const body = await req.json();
    const { 
      title, 
      location, 
      duration, 
      price, 
      rating, 
      image,
      coverImage,
      category,
      itinerary,
      content,
      isTopTour
    } = body;

    // Validate required fields
    if (!title || !location || !duration || !price || !image) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Find the tour and update it
    const updatedTour = await tourPackage.findByIdAndUpdate(
      tourId,
      {
        title,
        location,
        duration,
        price,
        rating,
        image,
        coverImage,
        category,
        itinerary,
        content,
        isTopTour
      },
      { new: true, runValidators: true } // Return the updated document and run schema validators
    );

    if (!updatedTour) {
      return NextResponse.json({ error: "Tour not found" }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Tour updated successfully", 
      data: updatedTour 
    });
  } catch (err) {
    console.error("Error updating tour:", err);
    
    // Handle validation errors specifically
    if (err.name === 'ValidationError') {
      return NextResponse.json({ 
        error: "Validation Error", 
        details: err.message 
      }, { status: 400 });
    }
    
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE handler to remove a specific tour by ID
export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.name !== process.env.ADMIN_USER) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
     const tourId = params.id;

    if (!tourId) {
      return NextResponse.json({ error: "Tour ID is required" }, { status: 400 });
    }

    const deletedTour = await tourPackage.findByIdAndDelete(tourId);

    if (!deletedTour) {
      return NextResponse.json({ error: "Tour not found" }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Tour deleted successfully" 
    });
  } catch (err) {
    console.error("Error deleting tour:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}