const Patient = require("../models/patient.model");
const Test = require("../models/test.model");
const Report = require("../models/report.model");
const asyncHandler = require("../middleware/asyncHandler");

//get dashboard statistics
const getStats = asyncHandler(async (req, res) => {
  const [totalPatients, totalTests, pendingReports, completedReports] =
    await Promise.all([
      Patient.countDocuments(),
      Report.countDocuments(), // total tests conducted = total reports/assignments
      Report.countDocuments({ status: "Pending" }),
      Report.countDocuments({ status: "Completed" }),
    ]);

  res.status(200).json({
    success: true,
    data: {
      totalPatients,
      totalTestsConducted: totalTests,
      pendingReports,
      completedReports,
    },
  });
});

module.exports = { getStats };
