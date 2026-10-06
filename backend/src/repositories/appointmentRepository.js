// repositories/appointmentRepository.js

const pool = require("../config/db");
const Appointment = require("../models/appointmentModel");


const create = async (data, userId) => {

    const { patientId, appointmentDate, status, reason, notes } = data;

    const result = await pool.query(
        `INSERT INTO appointments
        (
            patient_id,
            appointment_date,
            status,
            reason,
            notes,
            created_by
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`,
        [
            patientId,
            appointmentDate,
            status,
            reason,
            notes,
            userId
        ]
    );

    return new Appointment(result.rows[0]);
};


const findAll = async (date, status) => {

    let query = `
        SELECT
            appointments.*,
            patients.full_name AS patient_name
        FROM appointments

        JOIN patients
        ON appointments.patient_id = patients.id

        WHERE 1 = 1
    `;

    const values = [];

    if (date) {
        values.push(date);

        query += ` AND appointment_date >= $${values.length}::date AND appointment_date < $${values.length}::date + INTERVAL '1 day' `;
    }

    if (status) {
        values.push(status);

        query += ` AND status = $${values.length} `;
    }

    query += ` ORDER BY appointment_date ASC `;

    const result = await pool.query(
        query,
        values
    );

    return result.rows.map(
        row => new Appointment(row)
    );
};


const findById = async (id) => {

    const result = await pool.query(`SELECT * FROM appointments WHERE id = $1`, [id]);

    if (result.rows.length === 0) {
        return null;
    }

    return new Appointment(result.rows[0]);
};


const findConfirmedConflict = async (
    patientId,
    appointmentDate,
    excludedId = null
) => {

    let query = `
        SELECT *
        FROM appointments

        WHERE patient_id = $1

        AND status = 'confirmed'

        AND appointment_date >
            $2::timestamptz - INTERVAL '30 minutes'

        AND appointment_date <
            $2::timestamptz + INTERVAL '30 minutes'
    `;

    const values = [
        patientId,
        appointmentDate
    ];

    if (excludedId) {
        values.push(excludedId);

        query += ` AND id != $3 `;
    }

    const result = await pool.query(
        query,
        values
    );

    return result.rows.length > 0;
};


const updateStatus = async (id, status) => {

    const result = await pool.query(`UPDATE appointments SET status = $1 WHERE id = $2 RETURNING *`, [status, id]);

    if (result.rows.length === 0) {
        return null;
    }

    return new Appointment(result.rows[0]);
};


module.exports = { create, findAll, findById, findConfirmedConflict, updateStatus };