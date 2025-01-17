"use client";
import axios from "axios";
import React, { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";

const AddPatientModal = ({
  onClose,
  onSuccess,
}: {
  onClose: Dispatch<SetStateAction<boolean>>;
  onSuccess: () => void;
}) => {
  const [staffName, setStaffName] = useState("");
  const [staffContact, setStaffContact] = useState("");
  const [staffLocation, setStaffLocation] = useState("");

  // =================================================
  const handleSaveStaff = async () => {
    console.log(staffName, staffContact, staffLocation);
    // return;

    try {
      const response = await axios.post("/api/pantry", {
        staffName,
        staffContact,
        staffLocation,
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
          <h1 className="font-bold">Add staff details</h1>
          <span onClick={() => onClose(false)} className="cursor-pointer">
            Close
          </span>
        </div>
        <form className="w-full clear-both *:text-xl *:mb-4 [&>*>*:first-child]:font-semibold [&>*>*:is(input)]:border [&>*>*:is(input)]:border-black/50 [&>*>*:is(input)]:w-full [&>*>*:is(input)]:p-1 [&>*>*:is(input)]:rounded-md [&>*>*:is(input)]:mt-1">
          <div className="">
            <label>Name: </label>
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => {
                setStaffName(e.target.value);
              }}
            />
          </div>
          <div className="">
            <label>Contact: </label>
            <input
              type="text"
              placeholder="Contact"
              onChange={(e) => {
                setStaffContact(e.target.value);
              }}
            />
          </div>
          <div className="">
            <label>Location: </label>
            <input
              type="text"
              placeholder="Location"
              onChange={(e) => {
                setStaffLocation(e.target.value);
              }}
            />
          </div>
        </form>
        <div className="text-center text-2xl  w-full flex items-end justify-end">
          <button
            className="bg-blue-500 text-white px-5 py-2 hover:bg-blue-700 rounded-md"
            onClick={() => handleSaveStaff()}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPatientModal;
