"use client";
import { Patient } from "@/types/types";
import axios from "axios";
import React, { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";

const DeletePatient = ({
  onClose,
  patient,
  onSuccess,
}: {
  onClose: Dispatch<SetStateAction<boolean>>;
  patient: Patient;
  onSuccess: () => void;
}) => {
  const handleDeletePatient = async () => {
    try {
      // const response = await axios.delete(`/api/patient/${patient._id}`);
      const response = await axios.delete("/api/patient", {
        data: { patientId: patient._id },
      });
      toast(response.data.message);

      if (response.status) {
        onSuccess();
        onClose(false);
      }
      console.log("delete response: ", response);
    } catch (error) {
      console.log(error);
      toast(error);
    }
  };

  // console.log("from delete: ", patient);

  // ==================================
  return (
    <div className="absolute flex items-center justify-center w-screen h-screen bg-black/25 z-10">
      {/* <ToastContainer /> */}
      <div className="bg-white w-[80%] md:w-[60%] xl:w-[40%] h-[20%] rounded-md p-5 flex flex-col justify-between">
        <div className="text-2xl mb-6 flex justify-between">
          <h1 className="font-bold">Confirm patient deletion</h1>
          <span onClick={() => onClose(false)} className="cursor-pointer">
            Close
          </span>
        </div>

        <div className="text-center text-2xl  w-full flex items-end justify-end">
          <button
            className="bg-blue-500 text-white px-5 py-2 hover:bg-blue-700 rounded-md"
            onClick={() => handleDeletePatient()}
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePatient;
