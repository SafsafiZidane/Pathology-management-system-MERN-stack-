require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/error.middleware");

// Route files
const authRoutes = require("./routes/auth.route");
const patientRoutes = require("./routes/patient.routes");
const testRoutes = require("./routes/test.routes");
const reportRoutes = require("./routes/report.routes");
const dashboardRoutes = require("./routes/dashboard.routes");

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Health check
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Pathology Management API is running" });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/tests", testRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Error handling 
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running  on port ${PORT}`);
});
