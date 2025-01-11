import connect from "@/lib/mongodb";
import Patient from "@/models/Patient";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    await connect();

    const {
      id,
      morningIngredients,
      morningMeal,
      morningOthers,
      eveningMeal,
      eveningIngredients,
      eveningOthers,
      nightMeal,
      nightIngredients,
      nightOthers,
    } = await request.json();

    const updatedPatientDietChart = await Patient.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          foodChart: {
            morningIngredients,
            morningMeal,
            morningOthers,
            eveningMeal,
            eveningIngredients,
            eveningOthers,
            nightMeal,
            nightIngredients,
            nightOthers,
          },
        },
      },
      {
        returnDocument: "after",
      }
    );

    return NextResponse.json({
      message: "Patient diet chart edited successfully",
      data: updatedPatientDietChart,
    });
  } catch (error) {
    //  if (error.code === 11000) {
    //    return NextResponse.json({ message: "Patient name must be unique" });
    //  }
    return NextResponse.json({ error: "EDIT diet chart error" });
  }
}
