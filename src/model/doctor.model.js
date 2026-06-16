import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  specialization: { type: String, required: true },
  mobile: { type: Number },
});

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
