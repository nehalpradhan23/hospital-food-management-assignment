import mongoose from "mongoose";

const pantryStaffSchema = new mongoose.Schema({
  staffName: { type: String, required: true },
  staffContact: { type: String, required: true },
  staffLocation: { type: String, required: true },
  staffFoodPreparationTask: { type: String, default: "" },
  staffFoodDeliveryTask: { type: String, default: "" },
});

const PantryStaff =
  mongoose.models.PantryStaff ||
  mongoose.model("PantryStaff", pantryStaffSchema);
export default PantryStaff;
