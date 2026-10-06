import { useEffect, useState } from "react";
import {
    useNavigate,
    useParams
} from "react-router-dom";

import patientService from "../../services/patientService";
import PatientForm from "../../components/patients/PatientForm";

import "./PatientFormPage.css";

function PatientFormPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const isEdit = Boolean(id);

    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingPatient, setLoadingPatient] = useState(isEdit);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!isEdit) {
            return;
        }

        const loadPatient = async () => {
            try {
                const data =
                    await patientService.getPatientById(id);

                setPatient(data);

            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    "Impossible de charger le patient"
                );
            } finally {
                setLoadingPatient(false);
            }
        };

        loadPatient();

    }, [id, isEdit]);

    const handleSubmit = async (formData) => {
        try {
            setLoading(true);
            setError("");

            if (isEdit) {
                await patientService.updatePatient(
                    id,
                    formData
                );
            } else {
                await patientService.createPatient(
                    formData
                );
            }

            navigate("/patients");

        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.message ||
                "Erreur lors de l'enregistrement"
            );
        } finally {
            setLoading(false);
        }
    };

    if (loadingPatient) {
        return (
            <div className="patient-form-page">
                <p>Chargement...</p>
            </div>
        );
    }

    return (
        <div className="patient-form-page">

            <div className="patient-form-container">

                <div className="patient-form-header">

                    <div>
                        <h1>
                            {isEdit
                                ? "Modifier le patient"
                                : "Ajouter un patient"}
                        </h1>

                        <p>
                            {isEdit
                                ? "Mettez à jour les informations du patient"
                                : "Ajoutez un nouveau patient à ClinicFlow"}
                        </p>
                    </div>

                    <button
                        className="back-button"
                        onClick={() =>
                            navigate("/patients")
                        }
                    >
                        Retour
                    </button>

                </div>

                {error && (
                    <div className="patients-error">
                        {error}
                    </div>
                )}

                <div className="patient-form-card">

                    <PatientForm
                        initialData={patient}
                        onSubmit={handleSubmit}
                        loading={loading}
                    />

                </div>

            </div>

        </div>
    );
}

export default PatientFormPage;