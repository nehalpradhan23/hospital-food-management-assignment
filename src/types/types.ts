export interface GlobalContextType {
  userObject: {
    user: undefined;
    setUser: React.Dispatch<React.SetStateAction<undefined>>;
    isAuthUser: boolean | undefined;
    setIsAuthUser: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  };
  patientsObject: {
    storeAllPatients: Patient[];
    setStoreAllPatients: React.Dispatch<React.SetStateAction<Patient[] | []>>;
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
  foodChart: {
    morningIngredients: string;
    morningMeal: string;
    morningOthers: string;
    eveningMeal: string;
    eveningIngredients: string;
    eveningOthers: string;
    nightMeal: string;
    nightIngredients: string;
    nightOthers: string;
  };
}

export interface PantryStaff {
  _id?: string;
  staffName: string;
  staffContact: string;
  staffLocation: string;
  staffFoodPreparationTask: string;
  staffFoodDeliveryTask: string;
}
