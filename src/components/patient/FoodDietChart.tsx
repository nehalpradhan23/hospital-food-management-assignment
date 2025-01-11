"use client";
import { Patient } from "@/types/types";
import axios from "axios";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const FoodDietChart = ({
  onClose,
  currentPatientDietChart,
  onSuccess,
}: {
  onClose: Dispatch<SetStateAction<boolean>>;
  currentPatientDietChart: Patient;
  onSuccess: () => void;
}) => {
  // console.log("diet chart: ", currentPatientDietChart);

  const { foodChart } = currentPatientDietChart;

  // =========================================================
  const [morningMeal, setMorningMeal] = useState(foodChart.morningMeal);
  const [morningIngredients, setMorningIngredients] = useState(
    foodChart.morningIngredients
  );
  const [morningOthers, setMorningOthers] = useState(foodChart.morningOthers);

  const [eveningMeal, setEveningMeal] = useState(foodChart.eveningMeal);
  const [eveningIngredients, setEveningIngredients] = useState(
    foodChart.eveningIngredients
  );
  const [eveningOthers, setEveningOthers] = useState(foodChart.eveningOthers);

  const [nightMeal, setNightMeal] = useState(foodChart.nightMeal);
  const [nightIngredients, setNightIngredients] = useState(
    foodChart.nightIngredients
  );
  const [nightOthers, setNightOthers] = useState(foodChart.nightOthers);

  // ====================================================
  const handleSavePatientMealChart = async () => {
    try {
      const response = await axios.put("/api/patient/dietChart", {
        id: currentPatientDietChart._id,
        morningIngredients,
        morningMeal,
        morningOthers,
        eveningMeal,
        eveningIngredients,
        eveningOthers,
        nightMeal,
        nightIngredients,
        nightOthers,
      });
      toast(response.data.message);
      if (response.data.data) {
        onClose(false);
        onSuccess();
      }
    } catch (error) {
      console.log(error);
      toast(error);
    }
  };

  // ==================================
  return (
    <div className="absolute flex items-center justify-center w-screen h-screen bg-black/25 z-10">
      {/* <ToastContainer /> */}
      <div className="bg-white w-[80%] md:w-[60%] xl:w-[40%] h-[80%] rounded-md p-5 flex flex-col">
        <div className="text-2xl mb-6 flex justify-between">
          <h1 className="font-bold">
            {currentPatientDietChart.patientName} Diet Chart
          </h1>
          <span onClick={() => onClose(false)} className="cursor-pointer">
            Close
          </span>
        </div>
        <div className="flex-1 flex flex-col overflow-scroll gap-4">
          <div className="flex flex-col gap-2">
            {/* morning ============================= */}
            <span className="text-xl font-semibold text-center">Morning</span>
            <div className="flex flex-col gap-2 *:px-2 *:py-1">
              <div className="flex items-center gap-3">
                <span className="w-[120px]">Meal: </span>
                <input
                  onChange={(e) => setMorningMeal(e.target.value)}
                  value={morningMeal}
                  type="text"
                  placeholder="Meal"
                  className="border border-black px-2 py-1 w-full rounded-md"
                />
              </div>
              <div className="flex items-center gap-3">
                <span className="w-[120px]">Ingredients: </span>
                <input
                  onChange={(e) => setMorningIngredients(e.target.value)}
                  value={morningIngredients}
                  type="text"
                  placeholder="Ingredients"
                  className="border border-black px-2 py-1 w-full rounded-md"
                />
              </div>
              <div className="flex items-center gap-3">
                <span className="w-[120px]">Other specific: </span>
                <input
                  onChange={(e) => setMorningOthers(e.target.value)}
                  value={morningOthers}
                  type="text"
                  placeholder="Other specific"
                  className="border border-black px-2 py-1 w-full rounded-md"
                />
              </div>
            </div>
          </div>
          {/* evening ============================= */}
          <div className="flex flex-col gap-2">
            <span className="text-xl font-semibold text-center">Evening</span>
            <div className="flex flex-col gap-2 *:px-2 *:py-1">
              <div className="flex items-center gap-3">
                <span className="w-[120px]">Meal: </span>
                <input
                  onChange={(e) => setEveningMeal(e.target.value)}
                  value={eveningMeal}
                  type="text"
                  placeholder="Meal"
                  className="border border-black px-2 py-1 w-full rounded-md"
                />
              </div>
              <div className="flex items-center gap-3">
                <span className="w-[120px]">Ingredients: </span>
                <input
                  onChange={(e) => setEveningIngredients(e.target.value)}
                  value={eveningIngredients}
                  type="text"
                  placeholder="Ingredients"
                  className="border border-black px-2 py-1 w-full rounded-md"
                />
              </div>
              <div className="flex items-center gap-3">
                <span className="w-[120px]">Other specific: </span>
                <input
                  onChange={(e) => setEveningOthers(e.target.value)}
                  value={eveningOthers}
                  type="text"
                  placeholder="Other specific"
                  className="border border-black px-2 py-1 w-full rounded-md"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xl font-semibold text-center">Night</span>
            <div className="flex flex-col gap-2 *:px-2 *:py-1">
              <div className="flex items-center gap-3">
                <span className="w-[120px]">Meal: </span>
                <input
                  onChange={(e) => setNightMeal(e.target.value)}
                  value={nightMeal}
                  type="text"
                  placeholder="Meal"
                  className="border border-black px-2 py-1 w-full rounded-md"
                />
              </div>
              <div className="flex items-center gap-3">
                <span className="w-[120px]">Ingredients: </span>
                <input
                  onChange={(e) => setNightIngredients(e.target.value)}
                  value={nightIngredients}
                  type="text"
                  placeholder="Ingredients"
                  className="border border-black px-2 py-1 w-full rounded-md"
                />
              </div>
              <div className="flex items-center gap-3">
                <span className="w-[120px]">Other specific: </span>
                <input
                  onChange={(e) => setNightOthers(e.target.value)}
                  value={nightOthers}
                  type="text"
                  placeholder="Other specific"
                  className="border border-black px-2 py-1 w-full rounded-md"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-2xl  w-full flex items-end justify-end">
          <button
            className="bg-blue-500 text-white px-5 py-2 hover:bg-blue-700 rounded-md"
            onClick={() => handleSavePatientMealChart()}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodDietChart;
