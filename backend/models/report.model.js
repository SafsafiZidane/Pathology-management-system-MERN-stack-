const mongoose = require("mongoose");

const resultValueSchema = new mongoose.Schema(
  {
    test: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test",
      required: true,
    },
    value: {
      type: String,
      default: "",
    },
    unit: {
      type: String,
      default: "",
    },
    normalRange: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const reportSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: [true, "Patient is required"],
    },
    tests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Test",
        required: true,
      },
    ],
    resultValues: [resultValueSchema],
    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },
    totalAmount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);
