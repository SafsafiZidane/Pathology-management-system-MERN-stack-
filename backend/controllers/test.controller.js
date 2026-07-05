const Test = require("../models/test.model");
const asyncHandler = require("../middleware/asyncHandler");

//get all tests
const getTests = asyncHandler(async (req, res) => {
  const tests = await Test.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: tests.length, data: tests });
});

//get a single test by ID
const getTest = asyncHandler(async (req, res) => {
  const test = await Test.findById(req.params.id);

  if (!test) {
    res.status(404);
    throw new Error("Test not found");
  }

  res.status(200).json({ success: true, data: test });
});

//add a new test
const createTest = asyncHandler(async (req, res) => {
  const { testName, category, price, description } = req.body;

  const test = await Test.create({ testName, category, price, description });

  res.status(201).json({ success: true, data: test });
});

//update a test by ID
const updateTest = asyncHandler(async (req, res) => {
  let test = await Test.findById(req.params.id);

  if (!test) {
    res.status(404);
    throw new Error("Test not found");
  }

  test = await Test.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: test });
});

//delete a test by ID
const deleteTest = asyncHandler(async (req, res) => {
  const test = await Test.findById(req.params.id);

  if (!test) {
    res.status(404);
    throw new Error("Test not found");
  }

  await test.deleteOne();

  res.status(200).json({ success: true, message: "Test deleted", data: {} });
});

module.exports = { getTests, getTest, createTest, updateTest, deleteTest };
