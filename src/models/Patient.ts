import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  diseases: { type: String, required: true },
  allergies: { type: String, required: true },
  roomNumber: { type: Number, required: true },
  bedNumber: { type: Number, required: true },
  floorNumber: { type: Number, required: true },
  patientAge: { type: Number, required: true },
  patientGender: { type: String, required: true },
  contactInfo: { type: String, required: true },
  emergencyContact: { type: String, required: true },
  foodChart: {
    morningIngredients: { type: String, default: "" },
    morningMeal: { type: String, default: "" },
    morningOthers: { type: String, default: "" },
    eveningMeal: { type: String, default: "" },
    eveningIngredients: { type: String, default: "" },
    eveningOthers: { type: String, default: "" },
    nightMeal: { type: String, default: "" },
    nightIngredients: { type: String, default: "" },
    nightOthers: { type: String, default: "" },
  },
});

const Patient =
  mongoose.models.Patient || mongoose.model("Patient", patientSchema);
export default Patient;
