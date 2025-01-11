"use client";
import { PantryStaff } from "@/types/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const DeliveriesPage = () => {
  const [allPantryStaff, setAllPantryStaff] = useState([]);
  const [deliveriesStaff, setDeliveriesStaff] = useState([]);
  const [loading, setLoading] = useState(false);

  const getStaffData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/pantry");
      // console.log(response);
      setAllPantryStaff(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast(error.message);
    } finally {
      setLoading(false);
    }
  };
  // ===============================================
  const filterDeliveries = () => {
    setLoading(true);
    const data = allPantryStaff.filter(
      (staff: PantryStaff) => staff.staffFoodDeliveryTask.patientName !== ""
    );
    setDeliveriesStaff(data);
    setLoading(false);
  };
  // =========================
  useEffect(() => {
    getStaffData();
    setLoading(false);
  }, []);

  useEffect(() => {
    filterDeliveries();
  }, [allPantryStaff]);

  // =========================================
  const handleRemoveTask = async (id: string) => {
    try {
      const response = await axios.put("/api/pantry/foodDelivery", {
        id,
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
        getStaffData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ====================================================================
  return (
    <div className="bg-white h-screen p-8 flex flex-col gap-5 relative">
      <ToastContainer />
      <h1 className="text-5xl mt-8 mb-10 font-semibold">Deliveries list</h1>
      <div className="">
        <table className="w-full border border-black">
          <thead className=" border border-black">
            <tr className="*:border *:border-black *:py-2">
              <th></th>
              <th>Delivery status</th>
              <th className="">Staff Name</th>
              <th>Staff Contact</th>
              <th>Staff Location</th>
              <th>Deliver to</th>
              <th>Patient name</th>
              <th>Floor number</th>
              <th>Room number</th>
              <th>Bed number</th>
              <th>Meal time</th>
              <th>Meal</th>
              <th>Meal ingredients</th>
              <th>Meal others</th>
            </tr>
          </thead>
          <tbody className="">
            {deliveriesStaff?.map((staff: PantryStaff, index: number) => (
              <tr
                key={index}
                className="border border-black *:border *:border-black *:px-5 *:py-2 *:overflow-hidden"
              >
                {/* delete ============================== */}
                <td
                  className="text-center text-green-600 hover:bg-green-500 hover:text-black"
                  onClick={() => handleRemoveTask(staff._id)}
                >
                  <button className="font-bold hover:underline  underline">
                    Mark as delivered
                  </button>
                </td>
                <td className="text-center">
                  <span>not delivered</span>
                </td>
                {/* ========================== */}
                <td>{staff.staffName}</td>
                <td>{staff.staffContact}</td>
                <td>{staff.staffLocation}</td>
                <td className="text-center">------</td>
                <td className="text-center">
                  {staff.staffFoodDeliveryTask.patientName}
                </td>
                <td className="text-center">
                  {staff.staffFoodDeliveryTask.floorNumber}
                </td>
                <td className="text-center">
                  {staff.staffFoodDeliveryTask.roomNumber}
                </td>
                <td className="text-center">
                  {staff.staffFoodDeliveryTask.bedNumber}
                </td>
                <td className="text-center">
                  {staff.staffFoodDeliveryTask.mealTime}
                </td>
                <td className="text-center">
                  {staff.staffFoodDeliveryTask.meal}
                </td>
                <td className="text-center">
                  {staff.staffFoodDeliveryTask.mealIngredients}
                </td>
                <td className="text-center">
                  {staff.staffFoodDeliveryTask.mealOthers}
                </td>

                {/* <td>dasfasdf</td> */}
              </tr>
            ))}
          </tbody>
        </table>
        {loading && (
          <div className="text-8xl w-full h-screen flex justify-center mt-7">
            Loading
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveriesPage;
