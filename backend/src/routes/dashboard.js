const express = require("express");
const pool = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
    try {
        const totalPatientsResult = await pool.query("SELECT COUNT(*) FROM patients");

        const todayAppointmentsResult = await pool.query(`SELECT COUNT(*)
         FROM appointments
         WHERE appointment_date >= CURRENT_DATE
         AND appointment_date < CURRENT_DATE + INTERVAL '1 day'`
        );

        const pendingResult = await pool.query(`SELECT COUNT(*)
         FROM appointments
         WHERE status = 'pending'`
        );

        const confirmedResult = await pool.query(`SELECT COUNT(*)
         FROM appointments
         WHERE status = 'confirmed'`
        );

        res.json({
            totalPatients: parseInt(totalPatientsResult.rows[0].count),
            todayAppointments: parseInt(todayAppointmentsResult.rows[0].count),
            pending: parseInt(pendingResult.rows[0].count),
            confirmed: parseInt(confirmedResult.rows[0].count)
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Erreur serveur"
        });
    }
});

module.exports = router;