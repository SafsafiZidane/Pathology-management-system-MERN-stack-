const express = require("express");
const {
  getTests,
  getTest,
  createTest,
  updateTest,
  deleteTest,
} = require("../controllers/test.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

router.use(protect);

router.route("/").get(getTests).post(createTest);
router.route("/:id").get(getTest).put(updateTest).delete(deleteTest);

module.exports = router;
