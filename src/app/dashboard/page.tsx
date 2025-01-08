"use client";
import LogoutButton from "@/components/dashboard/LogoutButton";
import { useGlobalContext } from "@/context/ContextApi";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Dashboard = () => {
  const router = useRouter();
  const {
    userObject: { isAuthUser, setIsAuthUser, setUser },
  } = useGlobalContext();

  useEffect(() => {
    // if (isAuthUser === undefined) router.push("/login");
    if (!isAuthUser) router.push("/login");
  }, []);
  // if (!isAuthUser) return;
  return (
    <div>
      Dashboard
      <div onClick={() => router.push("/")}>home</div>
      <LogoutButton />
    </div>
  );
};

export default Dashboard;
