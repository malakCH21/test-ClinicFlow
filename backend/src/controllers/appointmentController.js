const { appointmentSchema, appointmentStatusSchema } = require("../validators/appointmentValidator");

const appointmentService = require("../services/appointmentService");


const createAppointment = async (req, res) => {
    const validation = appointmentSchema.safeParse(req.body);

    if (!validation.success) {
        return res.status(400).json({
            message: "Données invalides",
            errors: validation.error.issues
        });
    }

    try {
        const appointment = await appointmentService.createAppointment(
            validation.data,
            req.user.id
        );

        if (appointment.conflict) {
            return res.status(400).json({
                message: "Ce patient a déjà un rendez-vous confirmé dans une fenêtre de 30 minutes"
            });
        }

        res.status(201).json(appointment.data);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Erreur serveur"
        });
    }
};


const getAppointments = async (req, res) => {
    try {
        const { date, status } = req.query;

        const appointments = await appointmentService.getAppointments(date, status);

        res.json(appointments);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Erreur serveur"
        });
    }
};


const updateAppointmentStatus = async (req, res) => {
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

        const result = await appointmentService.updateAppointmentStatus(id, status);

        if (result.notFound) {
            return res.status(404).json({
                message: "Rendez-vous introuvable"
            });
        }

        if (result.conflict) {
            return res.status(400).json({
                message: "Ce patient a déjà un rendez-vous confirmé dans une fenêtre de 30 minutes"
            });
        }

        res.json(result.data);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Erreur serveur"
        });
    }
};


module.exports = { createAppointment, getAppointments, updateAppointmentStatus };