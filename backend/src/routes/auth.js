const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt");
const pool = require("../config/db");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

//POST /api/auth/login 

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if (result.rows.length === 0) {
            return res.status(401).json({
                message: "Email ou mot de passe incorrect"
            });
        }
        const user = result.rows[0];
        const passwordIsValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).json({
                message: "Email ou mot de passe incorrect"
            });
        }
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role
            },
            jwtConfig.secret,
            {
                expiresIn: jwtConfig.expiresIn
            }
        );

        res.json({
            message: "Connexion réussie",
            token,
            user: {
                id: user.id,
                fullName: user.full_name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Erreur serveur"
        });
    }
});

//GET /api/auth/me 

router.get("/me", authMiddleware, async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT id, full_name, email, role, created_at
            FROM users
            WHERE id = $1`,
            [req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Utilisateur introuvable"
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

module.exports = router;