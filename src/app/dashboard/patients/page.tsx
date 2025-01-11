"use client";

import AddPatientModal from "@/components/patient/AddPatientModal";
import DeletePatient from "@/components/patient/DeletePatient";
import EditPatientModal from "@/components/patient/EditPatientModal";
import FoodDietChart from "@/components/patient/FoodDietChart";
import { useGlobalContext } from "@/context/ContextApi";
import { Patient } from "@/types/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const PatientPage = () => {
  const {
    userObject: { isAuthUser, setIsAuthUser, setUser },
  } = useGlobalContext();

  const [allPatients, setAllPatients] = useState<Patient[] | []>([]);
  const [loading, setLoading] = useState(false);

  const [addingPatientModal, setAddingPatientModal] = useState(false);
  const [editingPatientModal, setEditingPatientModal] = useState(false);
  const [showDeletePatientModal, setShowDeletePatientModal] = useState(false);
  const [showFoodDietChart, setShowFoodDietChart] = useState(false);
  const [currentPatientDietChart, setCurrentPatientDietChart] =
    useState<Patient>(undefined);
  const [currentPatientEditing, setCurrentPatientEditing] =
    useState<Patient>(undefined);
  const [currentPatientToDelete, setCurrentPatientToDelete] =
    useState<Patient>(undefined);
  // =======================================================

  const router = useRouter();

  const getPatientsData = async () => {
    try {
      const response = await axios.get("/api/patient");
      // console.log(response);
      setAllPatients(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    getPatientsData();
  }, []);

  // ===========================================================
  const handlePatientFoodDietChart = (patient) => {
    setShowFoodDietChart(true);
    setCurrentPatientDietChart(patient);
  };
  // ===========================================================
  // console.log(allPatients);
  const handlePatientEdit = (patient: Patient) => {
    // console.log(patient);
    setCurrentPatientEditing(patient);
    setEditingPatientModal(true);
  };
  // ===========================================================

  const handleSuccessPatientSave = () => {
    getPatientsData();
  };

  // ===========================================================
  const handlePatientDelete = (patient: Patient) => {
    setShowDeletePatientModal(true);
    setCurrentPatientToDelete(patient);
  };
  // ===========================================================
  return (
    <>
      {addingPatientModal && (
        <AddPatientModal
          setAddingPatient={setAddingPatientModal}
          onSuccess={handleSuccessPatientSave}
        />
      )}
      {editingPatientModal && (
        <EditPatientModal
          setEditingPatient={setEditingPatientModal}
          currentEditingPatient={currentPatientEditing}
          onSuccess={handleSuccessPatientSave}
        />
      )}
      {showFoodDietChart && (
        <FoodDietChart
          currentPatientDietChart={currentPatientDietChart}
          onClose={setShowFoodDietChart}
          onSuccess={handleSuccessPatientSave}
        />
      )}
      {showDeletePatientModal && (
        <DeletePatient
          onClose={setShowDeletePatientModal}
          patient={currentPatientToDelete}
          onSuccess={handleSuccessPatientSave}
        />
      )}
      <div className="bg-white h-screen p-8 flex flex-col gap-5 relative">
        <ToastContainer />
        <h1 className="text-5xl mt-8 mb-10 font-semibold">Patients list</h1>
        {/* <div className="mb-10 p-5 bg-green-300"> */}
        <span
          onClick={() => setAddingPatientModal(true)}
          className="text-2xl border rounded-full px-6 py-2 border-black/30 bg-blue-600  cursor-pointer transition-all text-white hover:scale-105 w-fit"
        >
          Add a patient
        </span>
        {/* </div> */}
        {/* table ====================================== */}
        <div className="">
          <table className="w-full border border-black">
            <thead className="border border-black">
              <tr className="*:border *:border-black *:py-2">
                <th></th>
                <th></th>
                <th className="">Food/diet chart</th>
                <th>Patient Name</th>
                <th>Diseases</th>
                <th>Allergies</th>
                <th>Room Number</th>
                <th>Bed Number</th>
                <th>Floor Number</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Contact Info</th>
                <th>Emergency Contact</th>
              </tr>
            </thead>
            <tbody className="">
              {allPatients.map((patient: Patient, index: number) => (
                <tr
                  key={index}
                  className="border border-black *:border *:border-black *:px-5 *:py-2 *:overflow-hidden"
                >
                  <td className="w-5">
                    <button
                      className="text-blue-800 font-semibold"
                      onClick={() => handlePatientEdit(patient)}
                    >
                      Edit
                    </button>
                  </td>
                  <td
                    className="text-center hover:bg-red-500 cursor-pointer"
                    onClick={() => handlePatientDelete(patient)}
                  >
                    <button className="">🗑️</button>
                  </td>
                  <td>
                    <button
                      className="text-blue-800 font-semibold"
                      onClick={() => handlePatientFoodDietChart(patient)}
                    >
                      View
                    </button>
                  </td>
                  <td>{patient.patientName}</td>
                  <td>{patient.diseases}</td>
                  <td>{patient.allergies}</td>
                  <td>{patient.roomNumber}</td>
                  <td>{patient.bedNumber}</td>
                  <td>{patient.floorNumber}</td>
                  <td>{patient.patientAge}</td>
                  <td>{patient.patientGender}</td>
                  <td>{patient.contactInfo}</td>
                  <td>{patient.emergencyContact}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {loading && (
            <div className="text-8xl w-full h-screen flex justify-center mt-7">
              Loading
            </div>
          )}
          {loading && allPatients.length === 0 && (
            <div className="text-8xl w-full h-screen flex justify-center mt-7">
              No patients data
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PatientPage;
