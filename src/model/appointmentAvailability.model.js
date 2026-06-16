import mongoose from "mongoose";

const appointmentAvailabilitySchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    appointmentDate: { type: Date, ref: "Appointment", required: true },
    appointmentsAvailable: { type: Object },
  },
  { timestamps: true }
);

const AppointmentAvailability = mongoose.model("AppointmentAvailability", appointmentAvailabilitySchema);

export default AppointmentAvailability;
