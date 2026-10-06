const patientSchema = require("../validators/patientValidator");

const patientService = require("../services/patientService");

const createPatient = async (req, res) => {
    const validation = patientSchema.safeParse(req.body);

    if (!validation.success) {
        return res.status(400).json({
            message: "Données invalides",
            errors: validation.error.issues
        });
    }

    try {
        const patient = await patientService.createPatient(
            validation.data
        );

        res.status(201).json(patient);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Erreur serveur"
        });
    }
};

const getPatients = async (req, res) => {
    try {
        const search = req.query.search || "";
        const page = Math.max(parseInt(req.query.page) || 1, 1);
const limit = Math.max(parseInt(req.query.limit) || 5, 1);

        const result = await patientService.getPatients(
            search,
            page,
            limit
        );

        res.json(result);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Erreur serveur"
        });
    }
};

const getPatientById = async (req, res) => {
    try {
        const patient = await patientService.getPatientById(
            req.params.id
        );

        if (!patient) {
            return res.status(404).json({
                message: "Patient introuvable"
            });
        }

        res.json(patient);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Erreur serveur"
        });
    }
};

const updatePatient = async (req, res) => {
    const validation = patientSchema.safeParse(req.body);

    if (!validation.success) {
        return res.status(400).json({
            message: "Données invalides",
            errors: validation.error.issues
        });
    }

    try {
        const patient = await patientService.updatePatient(
            req.params.id,
            validation.data
        );

        if (!patient) {
            return res.status(404).json({
                message: "Patient introuvable"
            });
        }

        res.json(patient);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Erreur serveur"
        });
    }
};

const deletePatient = async (req, res) => {
    try {
        const patient = await patientService.deletePatient(
            req.params.id
        );

        if (!patient) {
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
};


module.exports = { createPatient, getPatients, getPatientById, updatePatient, deletePatient };

