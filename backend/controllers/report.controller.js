const Report = require("../models/report.model");
const Test = require("../models/test.model");
const asyncHandler = require("../middleware/asyncHandler");

//get all reports with optional status filter
const getReports = asyncHandler(async (req, res) => {
  const { status } = req.query;

  const query = {};
  if (status) query.status = status;

  const reports = await Report.find(query)
    .populate("patient", "name age gender mobile")
    .populate("tests", "testName category price")
    .sort({ createdAt: -1 });

  res.status(200).json({ success: true, count: reports.length, data: reports });
});

//get a single report by ID
const getReport = asyncHandler(async (req, res) => {
  const report = await Report.findById(req.params.id)
    .populate("patient")
    .populate("tests")
    .populate("resultValues.test", "testName category");

  if (!report) {
    res.status(404);
    throw new Error("Report not found");
  }

  res.status(200).json({ success: true, data: report });
});

//create a new report 
const createReport = asyncHandler(async (req, res) => {
  const { patient, tests } = req.body;

  if (!patient || !tests || tests.length === 0) {
    res.status(400);
    throw new Error("Patient and at least one test are required");
  }

  const testDocs = await Test.find({ _id: { $in: tests } });
  const totalAmount = testDocs.reduce((sum, t) => sum + t.price, 0);

  const resultValues = tests.map((testId) => ({
    test: testId,
    value: "",
    unit: "",
    normalRange: "",
  }));

  const report = await Report.create({
    patient,
    tests,
    resultValues,
    totalAmount,
    status: "Pending",
  });

  const populated = await report.populate([
    { path: "patient", select: "name age gender mobile" },
    { path: "tests", select: "testName category price" },
  ]);

  res.status(201).json({ success: true, data: populated });
});

//update a report by ID
const updateReport = asyncHandler(async (req, res) => {
  let report = await Report.findById(req.params.id);

  if (!report) {
    res.status(404);
    throw new Error("Report not found");
  }

  const { resultValues, status } = req.body;

  if (resultValues) report.resultValues = resultValues;
  if (status) {
    if (!["Pending", "Completed"].includes(status)) {
      res.status(400);
      throw new Error("Status must be Pending or Completed");
    }
    report.status = status;
  }

  await report.save();

  const populated = await report.populate([
    { path: "patient", select: "name age gender mobile" },
    { path: "tests", select: "testName category price" },
  ]);

  res.status(200).json({ success: true, data: populated });
});

//delete a report by ID
const deleteReport = asyncHandler(async (req, res) => {
  const report = await Report.findById(req.params.id);

  if (!report) {
    res.status(404);
    throw new Error("Report not found");
  }

  await report.deleteOne();

  res.status(200).json({ success: true, message: "Report deleted", data: {} });
});

module.exports = {
  getReports,
  getReport,
  createReport,
  updateReport,
  deleteReport,
};
