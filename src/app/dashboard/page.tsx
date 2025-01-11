"use client";
import LogoutButton from "@/components/dashboard/LogoutButton";
import { useGlobalContext } from "@/context/ContextApi";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

const Dashboard = () => {
  const router = useRouter();
  const {
    userObject: { isAuthUser, setIsAuthUser, setUser },
    patientsObject: { setStoreAllPatients },
  } = useGlobalContext();

  useEffect(() => {
    // if (isAuthUser === undefined) router.push("/login");
    if (!isAuthUser) {
      router.push("/login");
    } else {
      getPatientsData();
    }
  }, []);
  // if (!isAuthUser) return;

  const getPatientsData = async () => {
    try {
      const response = await axios.get("/api/patient");
      // console.log(response);
      setStoreAllPatients(response.data.data);
    } catch (error) {
      console.log(error);
      toast(error.message);
    }
  };
  return (
    <div>
      <ToastContainer />
      <div className="px-10 pt-10">
        <div className="flex justify-between items-center">
          <div className="text-6xl max-md:text-4xl">Dashboard</div>
          <div className="flex gap-4">
            <div
              className="flex items-center justify-center px-4 py-2 bg-blue-600 text-2xl rounded-md text-white cursor-pointer"
              onClick={() => router.push("/")}
            >
              home
            </div>
            <LogoutButton />
          </div>
        </div>
        <div className="mt-28 grid grid-cols-1 md:grid-cols-2 *:cursor-pointer  *:p-10 *:rounded-md gap-4 *:text-6xl">
          <div
            className="bg-green-400 hover:shadow-xl"
            onClick={() => router.push("/dashboard/patients")}
          >
            Patients
          </div>
          <div
            className="bg-yellow-400 hover:shadow-xl"
            onClick={() => router.push("/dashboard/pantry")}
          >
            Pantry/Deliveries
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
