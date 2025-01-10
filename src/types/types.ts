export interface GlobalContextType {
  userObject: {
    user: undefined;
    setUser: React.Dispatch<React.SetStateAction<undefined>>;
    isAuthUser: boolean | undefined;
    setIsAuthUser: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  };
}

export interface Patient {
  _id?: string;
  patientName: string;
  diseases: string;
  allergies: string;
  roomNumber: number;
  bedNumber: number;
  floorNumber: number;
  patientAge: number;
  patientGender: string;
  contactInfo: string;
  emergencyContact: string;
}
