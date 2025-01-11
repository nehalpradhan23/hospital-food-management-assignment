"use client";
import { GlobalContextType, Patient } from "@/types/types";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const ContextProvider = createContext<GlobalContextType>({
  userObject: {
    user: undefined,
    setUser: () => {},
    isAuthUser: undefined,
    setIsAuthUser: () => {},
  },
  patientsObject: {
    storeAllPatients: [],
    setStoreAllPatients: () => {},
  },
});

export default function GlobalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<undefined>(undefined);
  const [isAuthUser, setIsAuthUser] = useState<boolean | undefined>(undefined);
  const [storeAllPatients, setStoreAllPatients] = useState<Patient[] | []>([]);
  // const router = useRouter();

  // authenticate ---------------------------
  useEffect(() => {
    if (Cookies.get("hospitalManagementAssignmentToken") !== undefined) {
      setIsAuthUser(true);
      // const userData: any = JSON.parse(localStorage.getItem("user")!) || {};
      // setUser(userData);
    } else {
      setIsAuthUser(false);
      // router.push("/login");
    }
  }, [Cookies]);
  // -----------------------------------------------
  return (
    <ContextProvider.Provider
      value={{
        userObject: { user, setUser, isAuthUser, setIsAuthUser },
        patientsObject: { storeAllPatients, setStoreAllPatients },
      }}
    >
      {children}
    </ContextProvider.Provider>
  );
}

export const useGlobalContext = () => {
  const context = useContext(ContextProvider);
  if (!context) {
    throw new Error("useGlobalContext must be within a GlobalContextProvider");
  }
  return context;
};
