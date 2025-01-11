import connect from "@/lib/mongodb";
import PantryStaff from "@/models/PantryStaff";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    await connect();

    const {
      id,
      patientName,
      roomNumber,
      bedNumber,
      floorNumber,
      mealTime,
      meal,
      mealIngredients,
      mealOthers,
    } = await request.json();

    const updatedStaff = await PantryStaff.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          staffFoodDeliveryTask: {
            patientName,
            roomNumber,
            bedNumber,
            floorNumber,
            mealTime,
            meal,
            mealIngredients,
            mealOthers,
          },
        },
      },
      {
        returnDocument: "after",
      }
    );

    if (patientName === "") {
      return NextResponse.json({
        message: "Delivered successfully.",
        data: updatedStaff,
      });
    } else {
      return NextResponse.json({
        message: "Added staff food delivery task.",
        data: updatedStaff,
      });
    }
  } catch (error) {
    return NextResponse.json({
      message: "Error with adding food delivery task",
      error: error,
    });
  }
}
