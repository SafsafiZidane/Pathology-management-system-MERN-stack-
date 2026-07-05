const Patient = require("../models/patient.model");
const asyncHandler = require("../middleware/asyncHandler");

//get all patients with optional search filter with name or mobile number
const getPatients = asyncHandler(async (req, res) => {
  const { search } = req.query;

  let query = {};
  if (search) {
    query = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { mobile: { $regex: search, $options: "i" } },
      ],
    };
  }

  const patients = await Patient.find(query).sort({ createdAt: -1 });

  res.status(200).json({ success: true, count: patients.length, data: patients });
});

//get a single patient by ID
const getPatient = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id);

  if (!patient) {
    res.status(404);
    throw new Error("Patient not found");
  }

  res.status(200).json({ success: true, data: patient });
});

//create a new patient
const createPatient = asyncHandler(async (req, res) => {
  const { name, age, gender, mobile, address } = req.body;

  const patient = await Patient.create({ name, age, gender, mobile, address });

  res.status(201).json({ success: true, data: patient });
});

//update a patient by ID
const updatePatient = asyncHandler(async (req, res) => {
  let patient = await Patient.findById(req.params.id);

  if (!patient) {
    res.status(404);
    throw new Error("Patient not found");
  }

  patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: patient });
});

//delete a patient by ID
const deletePatient = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id);

  if (!patient) {
    res.status(404);
    throw new Error("Patient not found");
  }

  await patient.deleteOne();

  res.status(200).json({ success: true, message: "Patient deleted", data: {} });
});

module.exports = {
  getPatients,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient,
};
