import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db"; // Your MongoDB connection logic
import FormData from "@/models/formData"; // The schema you just created

export async function POST(req) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const { name, phone, email, destination, date, travellers } = body;

    if (!name || !phone || !email || !destination || !date || !travellers) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const formEntry = await FormData.create({
      name,
      phone,
      email,
      destination,
      date,
      travellers,
    });

    return NextResponse.json({ success: true, data: formEntry }, { status: 201 });
  } catch (error) {
    console.error("Form Submission Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
