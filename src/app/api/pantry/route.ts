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

export async function DELETE(request: Request) {
  try {
    const { staffId } = await request.json();
    if (!staffId) {
      return NextResponse.json(
        { message: "Need id to delete" },
        { status: 400 }
      );
    }
    await connect();
    const patientToDelete = await PantryStaff.findOneAndDelete({
      _id: staffId,
    });

    if (!patientToDelete) {
      return NextResponse.json({ message: "staff not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.log("Error deleting", error);

    return NextResponse.json(
      { message: "Deletion failed", error: error },
      { status: 500 }
    );
  }
}
