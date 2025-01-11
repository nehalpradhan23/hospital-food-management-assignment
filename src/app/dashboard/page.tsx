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
      Dashboard
      <div onClick={() => router.push("/dashboard/patients")}>Patients</div>
      <div onClick={() => router.push("/dashboard/pantry")}>Pantry</div>
      <div onClick={() => router.push("/")}>home</div>
      <LogoutButton />
    </div>
  );
};

export default Dashboard;
