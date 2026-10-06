class Appointment {
    constructor({ id, patient_id, appointment_date, status, reason, notes, created_by, created_at, patient_name }) {
        this.id = id;
        this.patientId = patient_id;
        this.appointmentDate = appointment_date;
        this.status = status;
        this.reason = reason;
        this.notes = notes;
        this.createdBy = created_by;
        this.createdAt = created_at;

        if (patient_name !== undefined) {
            this.patientName = patient_name;
        }
    }
}

module.exports = Appointment;