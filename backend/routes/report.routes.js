const express = require("express");
const {
  getReports,
  getReport,
  createReport,
  updateReport,
  deleteReport,
} = require("../controllers/report.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

router.use(protect);

router.route("/").get(getReports).post(createReport);
router.route("/:id").get(getReport).put(updateReport).delete(deleteReport);

module.exports = router;
