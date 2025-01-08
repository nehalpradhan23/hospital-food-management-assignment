"use client";
import { useGlobalContext } from "@/context/ContextApi";
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();
  const {
    userObject: { isAuthUser, setIsAuthUser, setUser },
  } = useGlobalContext();
  const handleLogout = () => {
    router.push("/");
    setIsAuthUser(false);
    Cookies.remove("hospitalManagementAssignmentToken");
  };
  return <div onClick={handleLogout}>LogoutButton</div>;
};

export default LogoutButton;
