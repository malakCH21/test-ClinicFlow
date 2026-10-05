const express = require("express");
const pool = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");
const patientSchema = require("../validators/patientValidator");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
    const validation = patientSchema.safeParse(req.body);

    if (!validation.success) {
        return res.status(400).json({
            message: "Données invalides",
            errors: validation.error.issues
        });
    }
    try {
        const { fullName, cin, phone, birthDate, address } = validation.data;
        const result = await pool.query(
            `INSERT INTO patients
        (full_name, cin, phone, birthdate, address)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
            [fullName, cin, phone, birthDate, address]
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
        const search = req.query.search || "";
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        const offset = (page - 1) * limit;

        const searchValue = `%${search}%`;

        const patientsResult = await pool.query(`SELECT * FROM patients WHERE full_name ILIKE $1 OR cin ILIKE $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3`, [searchValue, limit, offset]);

        const countResult = await pool.query(`SELECT COUNT(*) AS total FROM patients WHERE full_name ILIKE $1 OR cin ILIKE $1`, [searchValue]);

        const total = parseInt(countResult.rows[0].total);

        res.json({
            data: patientsResult.rows,
            pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Erreur serveur"
        });
    }
});


router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(`SELECT *FROM patients WHERE id = $1`, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Patient introuvable"
            });
        }

        res.json(result.rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Erreur serveur"
        });
    }
});



router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;

        const validation = patientSchema.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({
                message: "Données invalides",
                errors: validation.error.issues
            });
        }

        const { fullName, cin, phone, birthDate, address } = validation.data;

        const result = await pool.query(`
            UPDATE patients SET full_name = $1,cin = $2,phone = $3,birthdate = $4, address = $5 
            WHERE id = $6 RETURNING *`,[fullName, cin, phone, birthDate, address, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Patient introuvable"
            });
        }

        res.json(result.rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Erreur serveur"
        });
    }
});


router.delete("/:id", authMiddleware,roleMiddleware("admin"),async (req, res) => {
    try {
      const { id } = req.params;

      const result = await pool.query(
        `DELETE FROM patients WHERE id = $1 RETURNING *`,[id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          message: "Patient introuvable"
        });
      }

      res.json({
        message: "Patient supprimé avec succès"
      });

    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Erreur serveur"
      });
    }
  }
);

module.exports = router;