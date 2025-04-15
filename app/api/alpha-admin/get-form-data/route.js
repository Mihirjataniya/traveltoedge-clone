import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import FormData from "@/models/formData";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.name !== process.env.ADMIN_USER) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  

  try {
    await connectToDatabase();

    const submissions = await FormData.find().sort({ _id: -1 }); // latest first

    return NextResponse.json({ success: true, data: submissions });
  } catch (err) {
    console.error("GET Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
