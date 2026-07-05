
Readme · MD
# DoctorLog — Pathology Management System
 
A full-stack MERN application for managing a pathology lab's patients, tests,
and diagnostic reports. Built as a technical assessment submission for the
MERN Stack Developer Internship at KodeMelon Technologies.
 
## Live Links
| | |
|---|---|
| **Frontend (deployed)** | _add your deployment URL here_ |
| **Backend API (deployed)** | _add your deployment URL here_ |
| **GitHub Repository** | _add your repo link here_ |
 
## Tech Stack
- **Frontend:** React (Vite), React Router, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Auth:** JWT (JSON Web Tokens), password hashing
## Features
 
**Authentication**
- Admin login with JWT
- Protected API routes and protected frontend routes

**Dashboard**
- Total patients, total tests conducted, pending reports, completed reports

**Patient Management**
- Add, edit, delete, and view patients
- Search patients by name or mobile number
- Fields: name, age, gender, mobile number, address

**Test Management**
- Add, edit, delete, and view tests
- Fields: test name, category, price, description

**Report Management**
- Assign one or more tests to a patient (auto-calculates total amount)
- Enter/update result values, units, and normal ranges per test
- Mark reports as Pending or Completed
- Filter reports by status