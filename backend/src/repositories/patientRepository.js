const pool = require("../config/db");
const Patient = require("../models/patientModel");

const create = async (data) => {
    const {
        fullName,
        cin,
        phone,
        birthDate,
        address
    } = data;

    const result = await pool.query(
        `INSERT INTO patients
        (full_name, cin, phone, birthdate, address)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
        [
            fullName,
            cin,
            phone,
            birthDate,
            address
        ]
    );

    return new Patient(result.rows[0]);
};

const findAll = async (search, limit, offset) => {
    const searchValue = `%${search}%`;

    const result = await pool.query(
        `SELECT *
         FROM patients
         WHERE full_name ILIKE $1
         OR cin ILIKE $1
         ORDER BY created_at DESC
         LIMIT $2 OFFSET $3`,
        [
            searchValue,
            limit,
            offset
        ]
    );

    return result.rows.map(
        row => new Patient(row)
    );
};

const countAll = async (search) => {
    const searchValue = `%${search}%`;

    const result = await pool.query(
        `SELECT COUNT(*) AS total
         FROM patients
         WHERE full_name ILIKE $1
         OR cin ILIKE $1`,
        [searchValue]
    );

    return parseInt(result.rows[0].total);
};

const findById = async (id) => {
    const result = await pool.query(
        `SELECT *
         FROM patients
         WHERE id = $1`,
        [id]
    );

    if (result.rows.length === 0) {
        return null;
    }

    return new Patient(result.rows[0]);
};

const updateById = async (id, data) => {
    const {
        fullName,
        cin,
        phone,
        birthDate,
        address
    } = data;

    const result = await pool.query(
        `UPDATE patients
         SET
            full_name = $1,
            cin = $2,
            phone = $3,
            birthdate = $4,
            address = $5
         WHERE id = $6
         RETURNING *`,
        [
            fullName,
            cin,
            phone,
            birthDate,
            address,
            id
        ]
    );

    if (result.rows.length === 0) {
        return null;
    }

    return new Patient(result.rows[0]);
};

const deleteById = async (id) => {
    const result = await pool.query(
        `DELETE FROM patients
         WHERE id = $1
         RETURNING *`,
        [id]
    );

    if (result.rows.length === 0) {
        return null;
    }

    return new Patient(result.rows[0]);
};

module.exports = { create, findAll, countAll, findById, updateById, deleteById };