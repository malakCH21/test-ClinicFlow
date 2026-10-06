const appointmentRepository =
    require("../repositories/appointmentRepository");


const createAppointment = async (data, userId) => {

    if (data.status === "confirmed") {

        const conflict =
            await appointmentRepository.findConfirmedConflict(
                data.patientId,
                data.appointmentDate
            );

        if (conflict) {
            return {
                conflict: true
            };
        }
    }

    const appointment =
        await appointmentRepository.create(
            data,
            userId
        );

    return {
        conflict: false,
        data: appointment
    };
};


const getAppointments = async (date, status, patientId) => {

    return await appointmentRepository.findAll(
        date,
        status,
        patientId
    );
};


const updateAppointmentStatus = async (
    id,
    status
) => {

    const appointment =
        await appointmentRepository.findById(id);

    if (!appointment) {
        return {
            notFound: true
        };
    }

    if (status === "confirmed") {

        const conflict =
            await appointmentRepository.findConfirmedConflict(
                appointment.patientId,
                appointment.appointmentDate,
                id
            );

        if (conflict) {
            return {
                conflict: true
            };
        }
    }

    const updatedAppointment =
        await appointmentRepository.updateStatus(
            id,
            status
        );

    return {
        notFound: false,
        conflict: false,
        data: updatedAppointment
    };
};


module.exports = { createAppointment, getAppointments, updateAppointmentStatus };