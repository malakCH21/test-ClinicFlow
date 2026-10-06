const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const { createPatient, getPatients, getPatientById, updatePatient, deletePatient } = require("../controllers/patientController");

const router = express.Router();

router.post("/", authMiddleware, createPatient);

router.get("/", authMiddleware, getPatients);

router.get("/:id", authMiddleware, getPatientById);

router.put("/:id", authMiddleware, updatePatient);

router.delete("/:id", authMiddleware, roleMiddleware("admin"), deletePatient);

module.exports = router;