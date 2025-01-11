"use client";
import { Patient } from "@/types/types";
import axios from "axios";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const EditPatientModal = ({
  setEditingPatient,
  currentEditingPatient,
  onSuccess,
}: {
  setEditingPatient: Dispatch<SetStateAction<boolean>>;
  currentEditingPatient: Patient;
  onSuccess: () => void;
}) => {
  const [patientName, setPatientName] = useState(
    currentEditingPatient.patientName
  );
  const [diseases, setDiseases] = useState(currentEditingPatient.diseases);
  const [allergies, setAllergies] = useState(currentEditingPatient.allergies);
  const [roomNumber, setRoomNumber] = useState<Number | any>(
    currentEditingPatient.roomNumber
  );
  const [bedNumber, setBedNumber] = useState<Number | any>(
    currentEditingPatient.bedNumber
  );
  const [floorNumber, setFloorNumber] = useState<Number | any>(
    currentEditingPatient.floorNumber
  );
  const [patientAge, setPatientAge] = useState<Number | any>(
    currentEditingPatient.patientAge
  );
  const [patientGender, setPatientGender] = useState(
    currentEditingPatient.patientGender
  );
  const [contactInfo, setContactInfo] = useState(
    currentEditingPatient.contactInfo
  );
  const [emergencyContact, setEmergencyContact] = useState(
    currentEditingPatient.emergencyContact
  );

  console.log(currentEditingPatient._id);

  const handleSavePatient = async () => {
    try {
      const response = await axios.put("/api/patient", {
        id: currentEditingPatient._id,
        patientName,
        diseases,
        allergies,
        roomNumber,
        bedNumber,
        floorNumber,
        patientAge,
        patientGender,
        contactInfo,
        emergencyContact,
      });
      // console.log("patient data", response.data);
      toast(response.data.message);
      if (response.data.data) {
        setEditingPatient(false);
        onSuccess();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPatientGender(event.target.value || null);
    // console.log(event.target.value);
  };

  // ==================================
  return (
    <div className="absolute flex items-center justify-center w-screen h-screen bg-black/25 z-10">
      {/* <ToastContainer /> */}
      <div className="bg-white w-[80%] md:w-[60%] xl:w-[40%] h-[80%] rounded-md p-5 overflow-scroll flex flex-col">
        <div className="text-2xl mb-6 flex justify-between">
          <h1 className="font-bold">
            Edit {currentEditingPatient.patientName} details
          </h1>
          <span
            onClick={() => setEditingPatient(false)}
            className="cursor-pointer"
          >
            Close
          </span>
        </div>
        <form className="w-full clear-both *:text-xl *:mb-4 [&>*>*:first-child]:font-semibold [&>*>*:is(input)]:border [&>*>*:is(input)]:border-black/50 [&>*>*:is(input)]:w-full [&>*>*:is(input)]:p-1 [&>*>*:is(input)]:rounded-md [&>*>*:is(input)]:mt-1">
          <div className="">
            <label>Patient Name: </label>
            <input
              value={patientName}
              type="text"
              placeholder="Name"
              onChange={(e) => {
                setPatientName(e.target.value);
              }}
            />
          </div>
          <div className="">
            <label>Diseases: </label>
            <input
              value={diseases}
              type="text"
              placeholder="Diseases"
              onChange={(e) => {
                setDiseases(e.target.value);
              }}
            />
          </div>
          <div className="">
            <label>Allergies: </label>
            <input
              value={allergies}
              type="text"
              placeholder="Allergies"
              onChange={(e) => {
                setAllergies(e.target.value);
              }}
            />
          </div>
          <div className="">
            <label>Room number: </label>
            <input
              value={roomNumber}
              type="number"
              onWheelCapture={(e) => e.currentTarget.blur()}
              // onWheelCapture={}
              placeholder="Room number"
              onChange={(e) => {
                setRoomNumber(
                  e.target.value === "" ? "" : Number(e.target.value)
                );
              }}
            />
          </div>
          <div className="">
            <label>Bed number: </label>
            <input
              value={bedNumber}
              type="number"
              onWheelCapture={(e) => e.currentTarget.blur()}
              placeholder="Bed number"
              onChange={(e) => {
                // console.log(e);
                setBedNumber(
                  e.target.value === "" ? "" : Number(e.target.value)
                );
              }}
            />
          </div>
          <div className="">
            <label>Floor number: </label>
            <input
              value={floorNumber}
              type="number"
              onWheelCapture={(e) => e.currentTarget.blur()}
              placeholder="Floor number"
              onChange={(e) => {
                // console.log(e);
                setFloorNumber(
                  e.target.value === "" ? "" : Number(e.target.value)
                );
              }}
            />
          </div>
          <div className="">
            <label>Age: </label>
            <input
              value={patientAge}
              type="number"
              onWheelCapture={(e) => e.currentTarget.blur()}
              placeholder="Age"
              onChange={(e) => {
                // console.log(e);
                setPatientAge(
                  e.target.value === "" ? "" : Number(e.target.value)
                );
              }}
            />
          </div>
          <div className="">
            <label>Gender: </label>
            <select
              name=""
              id=""
              onChange={handleGenderChange}
              value={patientGender}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {/* <input type="text" placeholder="Gender" /> */}
          </div>
          <div className="">
            <label>Contact information: </label>
            <input
              value={contactInfo}
              type="text"
              placeholder="phone number"
              onChange={(e) => {
                // console.log(e);
                setContactInfo(e.target.value);
              }}
            />
          </div>
          <div className="">
            <label>Emergency contact: </label>
            <input
              value={emergencyContact}
              type="text"
              placeholder="emergeny phone"
              onChange={(e) => {
                // console.log(e);
                setEmergencyContact(e.target.value);
              }}
            />
          </div>
        </form>
        <div className="text-center text-2xl  w-full flex items-end justify-end">
          <button
            className="bg-blue-500 text-white px-5 py-2 hover:bg-blue-700 rounded-md"
            onClick={() => handleSavePatient()}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPatientModal;
