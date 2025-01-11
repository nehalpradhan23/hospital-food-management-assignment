"use client";
import { PantryStaff, Patient } from "@/types/types";
import axios from "axios";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";

const AssignFoodDeliveryModal = ({
  onClose,
  onSuccess,
  staff,
}: {
  onClose: Dispatch<SetStateAction<boolean>>;
  onSuccess: () => void;
  staff: PantryStaff;
}) => {
  const [allPatients, setAllPatients] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPatientsData = async () => {
    try {
      const response = await axios.get("/api/patient");
      // console.log(response);
      setAllPatients(response.data.data);
      //  setStoreAllPatients(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast(error.message);
    } finally {
      setLoading(false);
    }
  };

  // =================================================
  const handleAssignTask = async (patient: Patient, timeOfDay: string) => {
    console.log(patient, timeOfDay);
    // return;

    let meal = "";
    let mealIngredients = "";
    let mealOthers = "";
    if (timeOfDay === "morning") {
      meal = patient.foodChart.morningMeal;
      mealIngredients = patient.foodChart.morningIngredients;
      mealOthers = patient.foodChart.morningOthers;
    } else if (timeOfDay === "evening") {
      meal = patient.foodChart.eveningMeal;
      mealIngredients = patient.foodChart.eveningIngredients;
      mealOthers = patient.foodChart.nightIngredients;
    } else {
      meal = patient.foodChart.nightMeal;
      mealIngredients = patient.foodChart.nightIngredients;
      mealOthers = patient.foodChart.nightOthers;
    }
    try {
      const response = await axios.put("/api/pantry/foodDelivery", {
        id: staff._id,
        patientName: patient.patientName,
        roomNumber: patient.roomNumber,
        bedNumber: patient.bedNumber,
        floorNumber: patient.floorNumber,
        mealTime: timeOfDay,
        meal: meal,
        mealIngredients: mealIngredients,
        mealOthers: mealOthers,
      });
      console.log("staff data", response.data);
      toast(response.data.message);
      if (response.data.data) {
        onClose(false);
        onSuccess();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPatientsData();
  }, []);

  // ==================================
  return (
    <div className="absolute flex items-center justify-center w-screen h-screen bg-black/25 z-10">
      {/* <ToastContainer /> */}
      <div className="bg-white w-[80%] md:w-[60%] xl:w-[40%] h-[80%] rounded-md p-5 flex flex-col">
        <div className="text-2xl mb-6 flex justify-between">
          <h1 className="font-semibold">Add delivery task</h1>
          <span onClick={() => onClose(false)} className="cursor-pointer">
            Close
          </span>
        </div>
        {/* <form className="w-full clear-both *:text-xl *:mb-4 [&>*>*:first-child]:font-semibold [&>*>*:is(input)]:border [&>*>*:is(input)]:border-black/50 [&>*>*:is(input)]:w-full [&>*>*:is(input)]:p-1 [&>*>*:is(input)]:rounded-md [&>*>*:is(input)]:mt-1">
          <div className="">
            <label>Task: </label>
            <input
              type="text"
              placeholder="Add task"
              onChange={(e) => {
                setTask(e.target.value);
              }}
            />
          </div>
        </form> */}

        <div className="overflow-scroll h-full">
          <span className="text-xl font-semibold">Patients list</span>
          <div className="h-full">
            <div className="flex flex-col gap-3 mt-4">
              {allPatients?.map((patient: Patient) => (
                <>
                  {/* <div className="border border-black p-2 rounded-md">
                            <span className="text-2xl font-semibold">
                              Name: {patient.patientName}
                            </span>
                            <div className="mt-3 flex flex-col *:border *:border-black/50 *:rounded-md *:p-1 gap-2">
                              <div className="">
                                Morning: {patient.foodChart.morningMeal}
                              </div>
                              <div className="">
                                Evening: {patient.foodChart.eveningMeal}
                              </div>
                              <div className="">
                                Night: {patient.foodChart.nightMeal}
                              </div>
                            </div>
                          </div> */}
                  {patient.foodChart.eveningMeal &&
                    patient.foodChart.morningMeal &&
                    patient.foodChart.nightMeal && (
                      <div className="border border-black p-2 rounded-md">
                        <span className="text-2xl font-semibold">
                          Patient Name: {patient.patientName}
                        </span>
                        <div className="mt-3 flex flex-col *:border *:border-black/50 *:rounded-md *:p-1 *:px-2 gap-2">
                          {/* ------------------------------------------- */}
                          <div className="flex justify-between px-4 items-center">
                            <div className="flex flex-col">
                              <span className="overflow-hidden line-clamp-1">
                                Morning meal: {patient.foodChart.morningMeal}
                              </span>
                              <span className="overflow-hidden line-clamp-1">
                                Ingredients:{" "}
                                {patient.foodChart.morningIngredients}
                              </span>
                              <span className="overflow-hidden line-clamp-1">
                                Others: {patient.foodChart.morningOthers}
                              </span>
                            </div>
                            <button
                              onClick={() =>
                                handleAssignTask(patient, "morning")
                              }
                              className="bg-green-500 px-2 py-1 text-white rounded-md hover:bg-green-600"
                            >
                              Deliver
                            </button>
                          </div>
                          {/* --------------------------------------- */}
                          <div className="flex justify-between px-4 items-center">
                            <div className="flex flex-col">
                              <span className="overflow-hidden line-clamp-1">
                                Evening meal: {patient.foodChart.eveningMeal}
                              </span>
                              <span className="overflow-hidden line-clamp-1">
                                Ingredients:{" "}
                                {patient.foodChart.eveningIngredients}
                              </span>
                              <span className="overflow-hidden line-clamp-1">
                                Others: {patient.foodChart.eveningOthers}
                              </span>
                            </div>
                            <button
                              onClick={() =>
                                handleAssignTask(patient, "evening")
                              }
                              className="bg-green-500 px-2 py-1 text-white rounded-md hover:bg-green-600"
                            >
                              Deliver
                            </button>
                          </div>
                          {/*--------------------------------------  */}
                          <div className="flex justify-between px-4 items-center">
                            <div className="flex flex-col">
                              <span className="overflow-hidden line-clamp-1">
                                Night meal: {patient.foodChart.nightMeal}
                              </span>
                              <span className="overflow-hidden line-clamp-1">
                                Ingredients:{" "}
                                {patient.foodChart.nightIngredients}
                              </span>
                              <span className="overflow-hidden line-clamp-1">
                                Others: {patient.foodChart.nightOthers}
                              </span>
                            </div>
                            <button
                              onClick={() => handleAssignTask(patient, "night")}
                              className="bg-green-500 px-2 py-1 text-white rounded-md hover:bg-green-600"
                            >
                              Deliver
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                </>
              ))}
            </div>
          </div>
        </div>
        {/* ============================ */}
        {/* <div className="text-center text-2xl  w-full flex items-end justify-end">
          <button
            className="bg-blue-500 text-white px-5 py-2 hover:bg-blue-700 rounded-md"
            onClick={() => handleSaveStaffFoodPreparationTask()}
          >
            Save
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default AssignFoodDeliveryModal;
