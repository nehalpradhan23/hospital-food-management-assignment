"use client";
import AddStaffModal from "@/components/pantryStaff/AddStaffModal";
import AssignFoodDeliveryModal from "@/components/pantryStaff/AssignFoodDeliveryModal";
import AssignFoodPreparationModal from "@/components/pantryStaff/AssignFoodPreparationModal";
import DeleteStaff from "@/components/pantryStaff/DeleteStaff";
import ViewAssignedDeliveryTaskModal from "@/components/pantryStaff/ViewAssignedDeliveryTaskModal";
import ViewAssignedFoodPrepTaskModal from "@/components/pantryStaff/ViewAssignedFoodPrepTaskModal";
import { PantryStaff } from "@/types/types";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const PantryPage = () => {
  const [allPantryStaff, setAllPantryStaff] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addStaffModal, setAddStaffModal] = useState(false);
  const [showFoodPreparationModal, setShowFoodPreparationModal] =
    useState(false);
  const [showFoodDeliveryTaskModal, setShowFoodDeliveryTaskModal] =
    useState(false);
  const [currentSelectedStaff, setCurrentSelectedStaff] =
    useState<PantryStaff>(undefined);
  const [showDeleteStaffModal, setShowDeleteStaffModal] = useState(false);
  const [
    showAssignedFoodPreparationModal,
    setShowAssignedFoodPreparationModal,
  ] = useState(false);
  const [showAssignedFoodDeliveryModal, setShowAssignedFoodDeliveryModal] =
    useState(false);

  // food prep ===========================
  const handleAssignFoodPrep = (staff: PantryStaff) => {
    setShowFoodPreparationModal(true);
    setCurrentSelectedStaff(staff);
  };

  const handleAssignDeliveryTask = (staff: PantryStaff) => {
    setShowFoodDeliveryTaskModal(true);
    setCurrentSelectedStaff(staff);
  };

  // =====================================
  const getStaffData = async () => {
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
  // =====================================
  const handleSuccessStaffSave = () => {
    getStaffData();
  };
  // =============================
  const handleStaffDelete = (staff: PantryStaff) => {
    setShowDeleteStaffModal(true);
    setCurrentSelectedStaff(staff);
  };
  // ======================================
  const handleViewDeleteFoodPrep = (staff: PantryStaff) => {
    setShowAssignedFoodPreparationModal(true);
    setCurrentSelectedStaff(staff);
  };

  // =============================================
  const handleViewDeleteDeliveryTask = (staff: PantryStaff) => {
    setShowAssignedFoodDeliveryModal(true);
    setCurrentSelectedStaff(staff);
    console.log(staff);
  };
  // =============================================

  useEffect(() => {
    setLoading(true);
    getStaffData();
  }, []);
  console.log(allPantryStaff);

  // ===================================================
  return (
    <>
      {addStaffModal && (
        <AddStaffModal
          onClose={setAddStaffModal}
          onSuccess={handleSuccessStaffSave}
        />
      )}
      {/* food prep modal ================================= */}
      {showFoodPreparationModal && (
        <AssignFoodPreparationModal
          onClose={setShowFoodPreparationModal}
          onSuccess={handleSuccessStaffSave}
          staff={currentSelectedStaff}
        />
      )}
      {/* food delivery modal ================================= */}
      {showFoodDeliveryTaskModal && (
        <AssignFoodDeliveryModal
          onClose={setShowFoodDeliveryTaskModal}
          onSuccess={handleSuccessStaffSave}
          staff={currentSelectedStaff}
        />
      )}
      {/* delete staff modal ================================= */}
      {showDeleteStaffModal && (
        <DeleteStaff
          onClose={setShowDeleteStaffModal}
          onSuccess={handleSuccessStaffSave}
          staff={currentSelectedStaff}
        />
      )}
      {showAssignedFoodPreparationModal && (
        <ViewAssignedFoodPrepTaskModal
          onClose={setShowAssignedFoodPreparationModal}
          onSuccess={handleSuccessStaffSave}
          staff={currentSelectedStaff}
        />
      )}
      {showAssignedFoodDeliveryModal && (
        <ViewAssignedDeliveryTaskModal
          onClose={setShowAssignedFoodDeliveryModal}
          onSuccess={handleSuccessStaffSave}
          staff={currentSelectedStaff}
        />
      )}
      <div className="bg-white h-screen p-8 flex flex-col gap-5 relative">
        <ToastContainer />
        <h1 className="text-5xl mt-8 mb-10 font-semibold">Staff list</h1>
        {/* <div className="mb-10 p-5 bg-green-300"> */}
        <div className="flex justify-between">
          <span
            onClick={() => setAddStaffModal(true)}
            className="text-2xl border rounded-full px-6 py-2 border-black/30 bg-blue-600  cursor-pointer transition-all text-white hover:scale-105 w-fit"
          >
            Add a staff
          </span>
          <Link href={"/dashboard/pantry/deliveries"}>
            <span className="text-2xl border rounded-full px-6 py-2 border-black/30 bg-green-600  cursor-pointer transition-all text-white hover:scale-105 w-fit">
              Deliveries page -{">"}
            </span>
          </Link>
        </div>
        {/* </div> */}
        {/* table ====================================== */}
        <div className="">
          <table className="w-full border border-black">
            <thead className=" border border-black">
              <tr className="*:border *:border-black *:py-2">
                <th></th>
                <th className="">Name</th>
                <th>Contact</th>
                <th>Location</th>
                <th>Food preparation task</th>
                <th>Delivery task</th>
              </tr>
            </thead>
            <tbody className="">
              {allPantryStaff.map((staff: PantryStaff, index: number) => (
                <tr
                  key={index}
                  className="border border-black *:border *:border-black *:px-5 *:py-2 *:overflow-hidden"
                >
                  {/* delete ============================== */}
                  <td
                    className="text-center hover:bg-red-500 cursor-pointer"
                    onClick={() => handleStaffDelete(staff)}
                  >
                    <button className="">🗑️</button>
                  </td>
                  {/* ========================== */}
                  <td>{staff.staffName}</td>
                  <td>{staff.staffContact}</td>
                  <td>{staff.staffLocation}</td>
                  <td className="text-center">
                    {staff?.staffFoodPreparationTask?.length === 0 ? (
                      <button
                        className="text-blue-600 text-center font-semibold hover:underline"
                        onClick={() => handleAssignFoodPrep(staff)}
                      >
                        Assign food task
                      </button>
                    ) : (
                      <button
                        onClick={() => handleViewDeleteFoodPrep(staff)}
                        className="text-green-600 text-center font-semibold hover:underline"
                      >
                        View or remove task
                      </button>
                    )}
                  </td>
                  <td className="text-center">
                    {staff?.staffFoodDeliveryTask?.patientName.length === 0 ? (
                      <button
                        className="text-blue-600 text-center font-semibold hover:underline"
                        onClick={() => handleAssignDeliveryTask(staff)}
                      >
                        Assign delivery task
                      </button>
                    ) : (
                      <button
                        className="text-green-600 text-center font-semibold hover:underline"
                        onClick={() => handleViewDeleteDeliveryTask(staff)}
                      >
                        View or remove task
                      </button>
                    )}
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
          {loading && allPantryStaff.length === 0 && (
            <div className="text-8xl w-full h-screen flex justify-center mt-7">
              No patients data
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PantryPage;
