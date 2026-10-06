const pool = require("../config/db");


const countPatients = async () => {

    const result = await pool.query(`SELECT COUNT(*) AS total FROM patients`);

    return parseInt(result.rows[0].total);
};


const countTodayAppointments = async () => {

    const result = await pool.query(
        `SELECT COUNT(*) AS total
         FROM appointments
         WHERE appointment_date >= CURRENT_DATE
         AND appointment_date <
             CURRENT_DATE + INTERVAL '1 day'`
    );

    return parseInt(result.rows[0].total);
};


const countAppointmentsByStatus = async (status) => {

    const result = await pool.query(`SELECT COUNT(*) AS total FROM appointments WHERE status = $1`,[status]);

    return parseInt(result.rows[0].total);
};


module.exports = {countPatients,countTodayAppointments,countAppointmentsByStatus};