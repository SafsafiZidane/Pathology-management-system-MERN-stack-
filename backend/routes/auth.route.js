const express = require("express");
const { loginUser, getMe } = require("../controllers/auth.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/login", loginUser);
router.get("/me", protect, getMe);

module.exports = router;
