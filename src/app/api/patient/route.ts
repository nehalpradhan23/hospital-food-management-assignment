import connect from "@/lib/mongodb";
import Patient from "@/models/Patient";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connect();

    const {
      patientName,
      diseases,
      allergies,
      roomNumber,
      bedNumber,
      floorNumber,
      patientAge,
      patientGender,
      contactInfo,
      emergencyContact,
    } = await request.json();

    // Validate required fields
    if (
      !patientName ||
      !diseases ||
      !allergies ||
      !roomNumber ||
      !bedNumber ||
      !floorNumber ||
      !patientAge ||
      !patientGender ||
      !contactInfo ||
      !emergencyContact
    ) {
      return NextResponse.json({ message: "All fields are required" });
    }

    // Create and save the new patient
    const newPatient = new Patient({
      patientName,
      diseases,
      allergies,
      roomNumber,
      bedNumber,
      floorNumber,
      patientAge,
      patientGender,
      contactInfo,
      emergencyContact,
    });
    await newPatient.save();

    return NextResponse.json({
      message: "Patient added successfully",
      data: newPatient,
    });
  } catch (error) {
    return NextResponse.json({ error: "POST error" });
  }
}

export async function GET() {
  try {
    await connect();
    const patients = await Patient.find();
    return NextResponse.json({
      message: "Successful",
      data: patients,
    });
  } catch (error) {
    return NextResponse.json({ message: "Fetch error", error });
  }
}

export async function PUT(request: Request) {
  try {
    await connect();

    const {
      id,
      patientName,
      diseases,
      allergies,
      roomNumber,
      bedNumber,
      floorNumber,
      patientAge,
      patientGender,
      contactInfo,
      emergencyContact,
    } = await request.json();

    // Validate required fields
    if (
      !patientName ||
      !diseases ||
      !allergies ||
      !roomNumber ||
      !bedNumber ||
      !floorNumber ||
      !patientAge ||
      !patientGender ||
      !contactInfo ||
      !emergencyContact
    ) {
      return NextResponse.json({ message: "All fields are required" });
    }

    const updatedPatient = await Patient.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          patientName,
          diseases,
          allergies,
          roomNumber,
          bedNumber,
          floorNumber,
          patientAge,
          patientGender,
          contactInfo,
          emergencyContact,
        },
      },
      {
        returnDocument: "after",
      }
    );

    return NextResponse.json({
      message: "Patient edited successfully",
      data: updatedPatient,
    });
  } catch (error) {
    //  if (error.code === 11000) {
    //    return NextResponse.json({ message: "Patient name must be unique" });
    //  }
    return NextResponse.json({ error: "EDIT error" });
  }
}

export async function DELETE(request: Request) {
  try {
    const { patientId } = await request.json();
    if (!patientId) {
      return NextResponse.json(
        { message: "Need id to delete" },
        { status: 400 }
      );
    }
    await connect();
    const patientToDelete = await Patient.findOneAndDelete({
      _id: patientId,
    });

    if (!patientToDelete) {
      return NextResponse.json(
        { message: "patient not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.log("Error deleting", error);

    return NextResponse.json({ message: "Deletion failed" }, { status: 500 });
  }
}
