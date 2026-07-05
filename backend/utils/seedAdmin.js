// Run with: npm run seed
// Creates the initial admin account defined in .env (ADMIN_NAME/EMAIL/PASSWORD)
require("dotenv").config();
const connectDB = require("../config/db");
const User = require("../models/user.model");

const seed = async () => {
  await connectDB();

  const email = process.env.ADMIN_EMAIL;
  const existing = await User.findOne({ email });

  if (existing) {
    console.log(`Admin already exists with email: ${email}`);
    process.exit(0);
  }

  await User.create({
    name: process.env.ADMIN_NAME || "Admin",
    email,
    password: process.env.ADMIN_PASSWORD || "Admin@123",
    role: "admin",
  });

  console.log(`Admin created successfully: ${email}`);
  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
