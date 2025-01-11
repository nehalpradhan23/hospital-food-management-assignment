import connect from "@/lib/mongodb";
import PantryStaff from "@/models/PantryStaff";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    await connect();

    const { id, task } = await request.json();

    const updatedStaff = await PantryStaff.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          staffFoodDeliveryTask: task,
        },
      },
      {
        returnDocument: "after",
      }
    );

    return NextResponse.json({
      message: "Added staff food delivery task.",
      data: updatedStaff,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error with adding food delivery task",
      error: error,
    });
  }
}
