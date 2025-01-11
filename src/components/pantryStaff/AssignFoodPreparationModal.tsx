"use client";
import { useGlobalContext } from "@/context/ContextApi";
import { PantryStaff, Patient } from "@/types/types";
import axios from "axios";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";

const AssignFoodPreparationModal = ({
  onClose,
  onSuccess,
  staff,
}: {
  onClose: Dispatch<SetStateAction<boolean>>;
  onSuccess: () => void;
  staff: PantryStaff;
}) => {
  const [task, setTask] = useState("");
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

  useEffect(() => {
    getPatientsData();
  }, []);
  console.log("all patients ", allPatients);

  // =================================================
  const handleAssignTask = async (
    id: string,
    patientName: string,
    meal: string,
    ingredients: string,
    others: string
  ) => {
    // console.log(id, patientName, meal, ingredients, others);
    try {
      const response = await axios.put("/api/pantry/foodPreparation", {
        id: staff._id,
        task: `Preaparing food for ${patientName}, Meal: ${meal}, ingredients: ${ingredients}, others: ${others}`,
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

  // ==================================
  return (
    <div className="absolute flex items-center justify-center w-screen h-screen bg-black/25 z-10">
      {/* <ToastContainer /> */}
      <div className="bg-white w-[80%] md:w-[60%] xl:w-[40%] h-[80%] rounded-md p-5 flex flex-col">
        <div className="text-2xl mb-6 flex justify-between">
          <h1 className="font-semibold">Add food preparation task</h1>
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
        {/* list patients meal =========================== */}
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
                          Name: {patient.patientName}
                        </span>
                        <div className="mt-3 flex flex-col *:border *:border-black/50 *:rounded-md *:p-1 gap-2">
                          {/* ------------------------------------------- */}
                          <div className="flex justify-between items-center">
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
                                handleAssignTask(
                                  patient._id,
                                  patient.patientName,
                                  patient.foodChart.morningMeal,
                                  patient.foodChart.morningIngredients,
                                  patient.foodChart.morningOthers
                                )
                              }
                              className="bg-green-500 px-2 py-1 text-white rounded-md hover:bg-green-600"
                            >
                              Assign
                            </button>
                          </div>
                          {/* --------------------------------------- */}
                          <div className="flex justify-between items-center">
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
                                handleAssignTask(
                                  patient._id,
                                  patient.patientName,
                                  patient.foodChart.eveningMeal,
                                  patient.foodChart.eveningIngredients,
                                  patient.foodChart.eveningOthers
                                )
                              }
                              className="bg-green-500 px-2 py-1 text-white rounded-md hover:bg-green-600"
                            >
                              Assign
                            </button>
                          </div>
                          {/*--------------------------------------  */}
                          <div className="flex justify-between items-center">
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
                              onClick={() =>
                                handleAssignTask(
                                  patient._id,
                                  patient.patientName,
                                  patient.foodChart.nightMeal,
                                  patient.foodChart.nightIngredients,
                                  patient.foodChart.nightOthers
                                )
                              }
                              className="bg-green-500 px-2 py-1 text-white rounded-md hover:bg-green-600"
                            >
                              Assign
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

        {/* save button =========================================== */}
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

export default AssignFoodPreparationModal;
