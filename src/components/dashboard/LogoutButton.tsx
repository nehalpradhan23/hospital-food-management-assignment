"use client";
import { useGlobalContext } from "@/context/ContextApi";
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();
  const {
    userObject: { setIsAuthUser },
  } = useGlobalContext();
  const handleLogout = () => {
    router.push("/");
    setIsAuthUser(false);
    Cookies.remove("hospitalManagementAssignmentToken");
  };
  return (
    <div
      onClick={handleLogout}
      className="text-2xl rounded-md text-white cursor-pointer bg-red-400 px-4 py-2"
    >
      Logout
    </div>
  );
};

export default LogoutButton;
