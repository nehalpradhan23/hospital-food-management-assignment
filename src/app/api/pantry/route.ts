import connect from "@/lib/mongodb";
import PantryStaff from "@/models/PantryStaff";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  console.log("---------------------");

  try {
    await connect();

    const { staffName, staffContact, staffLocation } = await request.json();

    // Validate required fields
    if (!staffName || !staffContact || !staffLocation) {
      return NextResponse.json({ message: "All fields are required" });
    }

    // Create and save the new patient
    const newStaff = new PantryStaff({
      staffName,
      staffContact,
      staffLocation,
    });
    await newStaff.save();

    return NextResponse.json({
      message: "Staff added successfully",
      data: newStaff,
    });
  } catch (error) {
    return NextResponse.json({ error: "POST staff error" });
  }
}

export async function GET() {
  try {
    await connect();
    const pantryStaff = await PantryStaff.find();
    return NextResponse.json({
      message: "Successful",
      data: pantryStaff,
    });
  } catch (error) {
    return NextResponse.json({ message: "Fetch pantry staff error", error });
  }
}
