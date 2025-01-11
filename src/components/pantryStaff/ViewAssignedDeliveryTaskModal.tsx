"use client";
import { PantryStaff } from "@/types/types";
import axios from "axios";
import React, { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";

const ViewAssignedDeliveryTaskModal = ({
  onClose,
  staff,
  onSuccess,
}: {
  onClose: Dispatch<SetStateAction<boolean>>;
  staff: PantryStaff;
  onSuccess: () => void;
}) => {
  console.log("staff ", staff);

  const handleRemoveTask = async () => {
    try {
      const response = await axios.put("/api/pantry/foodDelivery", {
        id: staff._id,
        patientName: "",
        roomNumber: null,
        bedNumber: null,
        floorNumber: null,
        mealTime: "",
        meal: "",
        mealIngredients: "",
        mealOthers: "",
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
      <div className="bg-white w-[80%] md:w-[60%] xl:w-[40%] h-fit rounded-md p-5 flex flex-col justify-between">
        <div className="text-2xl mb-6 flex justify-between">
          <h1 className="font-bold">Delivery Task assigned</h1>
          <span onClick={() => onClose(false)} className="cursor-pointer">
            Close
          </span>
        </div>

        {/* delivery details ================================== */}
        <div className="my-5">
          <div className="flex flex-col text-2xl">
            <div className="flex justify-between">
              <span>Deliver to:</span>
              <span>{staff.staffFoodDeliveryTask.patientName}</span>
            </div>
            <div className="flex justify-between">
              <span>Bed number:</span>
              <span>{staff.staffFoodDeliveryTask.bedNumber}</span>
            </div>
            <div className="flex justify-between">
              <span>Floor number:</span>
              <span>{staff.staffFoodDeliveryTask.floorNumber}</span>
            </div>
            <div className="flex justify-between">
              <span>Room number:</span>
              <span>{staff.staffFoodDeliveryTask.roomNumber}</span>
            </div>
            <div className="flex justify-between">
              <span>Meal:</span>
              <span>{staff.staffFoodDeliveryTask.meal}</span>
            </div>
            <div className="flex justify-between">
              <span>Meal ingredients:</span>
              <span>{staff.staffFoodDeliveryTask.mealIngredients}</span>
            </div>
            <div className="flex justify-between">
              <span>Meal others:</span>
              <span>{staff.staffFoodDeliveryTask.mealOthers}</span>
            </div>
            <div className="flex justify-between">
              <span>Meal time:</span>
              <span>{staff.staffFoodDeliveryTask.mealTime}</span>
            </div>
          </div>
        </div>

        {/* ============================== */}
        <div className="text-center text-2xl  w-full flex items-end justify-end">
          <button
            className="bg-blue-500 text-white px-5 py-2 hover:bg-blue-700 rounded-md"
            onClick={() => handleRemoveTask()}
          >
            Mark as delivered
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewAssignedDeliveryTaskModal;
