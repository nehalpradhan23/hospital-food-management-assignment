import mongoose from "mongoose";

const pantryStaffSchema = new mongoose.Schema({
  staffName: { type: String, required: true },
  staffContact: { type: String, required: true },
  staffLocation: { type: String, required: true },
  staffFoodPreparationTask: { type: String, default: "" },
  // staffFoodDeliveryTask: { type: String, default: "" },
  staffFoodDeliveryTask: {
    patientName: { type: String, default: "" },
    roomNumber: { type: Number, default: "" },
    bedNumber: { type: Number, default: "" },
    floorNumber: { type: Number, default: "" },
    mealTime: { type: String, default: "" },
    meal: { type: String, default: "" },
    mealIngredients: { type: String, default: "" },
    mealOthers: { type: String, default: "" },
  },
});

const PantryStaff =
  mongoose.models.PantryStaff ||
  mongoose.model("PantryStaff", pantryStaffSchema);
export default PantryStaff;
