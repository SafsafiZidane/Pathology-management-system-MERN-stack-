const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Patient name is required"],
      trim: true,
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [0, "Age cannot be negative"],
      max: [150, "Age seems invalid"],
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: ["Male", "Female", "Other"],
    },
    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
      unique: true,
      trim: true,
      match: [/^[0-9]{10}$/, "Mobile number must be 10 digits"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

// Text index for search by name; mobile already indexed via unique:true
patientSchema.index({ name: "text" });

module.exports = mongoose.model("Patient", patientSchema);
