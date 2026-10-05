const express = require("express");
const pool = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");
const {
    appointmentSchema,
    appointmentStatusSchema
} = require("../validators/appointmentValidator");
const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
    const validation = appointmentSchema.safeParse(req.body);

    if (!validation.success) {
        return res.status(400).json({
            message: "Données invalides",
            errors: validation.error.issues
        });
    }
    try {
        const { patientId, appointmentDate, status, reason, notes } = validation.data;

        if (status === "confirmed") {
            const conflict = await pool.query(
                `SELECT * FROM appointments WHERE patient_id = $1
                 AND status = 'confirmed'
                 AND appointment_date > $2::timestamptz - INTERVAL '30 minutes'
                 AND appointment_date < $2::timestamptz + INTERVAL '30 minutes'`,
                [patientId, appointmentDate]
            );

            if (conflict.rows.length > 0) {
                return res.status(400).json({
                    message: "Ce patient a déjà un rendez-vous confirmé dans une fenêtre de 30 minutes"
                });
            }
        }

        const result = await pool.query(
            `INSERT INTO appointments (patient_id, appointment_date, status, reason, notes, created_by)
              VALUES ($1, $2, $3, $4, $5, $6)RETURNING *`,
            [patientId, appointmentDate, status, reason, notes, req.user.id]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Erreur serveur"
        });
    }
});


router.get("/", authMiddleware, async (req, res) => {
    try {
        const { date, status } = req.query;

        let query = `SELECT  appointments.*,
         patients.full_name AS patient_name
         FROM appointments
         JOIN patients
          ON appointments.patient_id = patients.id
          WHERE 1 = 1`;

        const values = [];

        if (date) {
            values.push(date);

            query += ` AND appointment_date >= $${values.length}::date AND appointment_date < $${values.length}::date + INTERVAL '1 day'`;
        }

        if (status) {
            values.push(status);

            query += ` AND status = $${values.length} `;
        }

        query += ` ORDER BY appointment_date ASC `;

        const result = await pool.query(query, values);

        res.json(result.rows);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Erreur serveur"
        });
    }
});

router.patch("/:id/status", authMiddleware, async (req, res) => {
    const validation = appointmentStatusSchema.safeParse(req.body);

    if (!validation.success) {
        return res.status(400).json({
            message: "Statut invalide",
            errors: validation.error.issues
        });
    }

    try {
        const { id } = req.params;
        const { status } = validation.data;


        const appointmentResult = await pool.query(`SELECT * FROM appointments WHERE id = $1`, [id]);

        if (appointmentResult.rows.length === 0) {
            return res.status(404).json({
                message: "Rendez-vous introuvable"
            });
        }

        const appointment = appointmentResult.rows[0];

        if (status === "confirmed") {
            const conflict = await pool.query(`SELECT * FROM appointments
              WHERE patient_id = $1
              AND status = 'confirmed'
              AND id != $2
              AND appointment_date > $3::timestamptz - INTERVAL '30 minutes'
              AND appointment_date < $3::timestamptz + INTERVAL '30 minutes'`,
                [appointment.patient_id, id, appointment.appointment_date]
            );

            if (conflict.rows.length > 0) {
                return res.status(400).json({
                    message: "Ce patient a déjà un rendez-vous confirmé dans une fenêtre de 30 minutes"
                });
            }
        }

        const result = await pool.query(`UPDATE appointments SET status = $1 WHERE id = $2 RETURNING *`, [status, id]);

        res.json(result.rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Erreur serveur"
        });
    }
});

module.exports = router;

