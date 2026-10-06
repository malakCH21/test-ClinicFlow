const pool = require("../config/db");
const User = require("../models/userModel");


const findByEmail = async (email) => {
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
};


const findById = async (id) => {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);

    if (result.rows.length === 0) {
        return null;
    }

    return new User(result.rows[0]);
};


module.exports = { findByEmail, findById };