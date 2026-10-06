import { useEffect, useState } from "react";
import {
    useNavigate,
    useParams
} from "react-router-dom";

import patientService from "../../services/patientService";
import appointmentService from "../../services/appointmentService";

import "./PatientDetailsPage.css";

function PatientDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [patient, setPatient] = useState(null);
    const [appointments, setAppointments] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadPatientDetails = async () => {
            try {
                setLoading(true);
                setError("");

                const patientData =
                    await patientService.getPatientById(id);

                const appointmentsData =
                    await appointmentService.getAppointments({
                        patientId: id
                    });

                setPatient(patientData);
                setAppointments(appointmentsData);

            } catch (error) {
                console.error(error);

                setError(
                    error.response?.data?.message ||
                    "Impossible de charger le patient"
                );
            } finally {
                setLoading(false);
            }
        };

        loadPatientDetails();

    }, [id]);

    if (loading) {
        return (
            <div className="patient-details-page">
                <p>Chargement...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="patient-details-page">
                <div className="details-error">
                    {error}
                </div>
            </div>
        );
    }

    if (!patient) {
        return null;
    }

    return (
        <div className="patient-details-page">

            <div className="patient-details-container">

                <div className="patient-details-header">

                    <div>
                        <h1>Détails du patient</h1>

                        <p>
                            Informations générales et rendez-vous
                        </p>
                    </div>

                    <div className="details-header-actions">

                        <button
                            className="details-back-button"
                            onClick={() =>
                                navigate("/patients")
                            }
                        >
                            Retour
                        </button>

                        <button
                            className="details-edit-button"
                            onClick={() =>
                                navigate(
                                    `/patients/${id}/edit`
                                )
                            }
                        >
                            Modifier
                        </button>

                    </div>

                </div>

                <div className="patient-info-card">

                    <div className="patient-info-title">
                        <div className="patient-avatar">
                            {patient.fullName
                                ?.charAt(0)
                                .toUpperCase()}
                        </div>

                        <div>
                            <h2>
                                {patient.fullName}
                            </h2>

                            <span>
                                CIN : {patient.cin}
                            </span>
                        </div>
                    </div>

                    <div className="patient-info-grid">

                        <div className="patient-info-item">
                            <span>Téléphone</span>
                            <strong>
                                {patient.phone}
                            </strong>
                        </div>

                        <div className="patient-info-item">
                            <span>
                                Date de naissance
                            </span>

                            <strong>
                                {patient.birthDate
                                    ? new Date(
                                        patient.birthDate
                                    ).toLocaleDateString(
                                        "fr-FR"
                                    )
                                    : "-"
                                }
                            </strong>
                        </div>

                        <div className="patient-info-item">
                            <span>Adresse</span>

                            <strong>
                                {patient.address || "-"}
                            </strong>
                        </div>

                        <div className="patient-info-item">
                            <span>
                                Date de création
                            </span>

                            <strong>
                                {patient.createdAt
                                    ? new Date(
                                        patient.createdAt
                                    ).toLocaleDateString(
                                        "fr-FR"
                                    )
                                    : "-"
                                }
                            </strong>
                        </div>

                    </div>

                </div>

                <div className="patient-appointments-card">

                    <div className="appointments-section-header">

                        <div>
                            <h2>Rendez-vous</h2>

                            <p>
                                Historique des rendez-vous
                                du patient
                            </p>
                        </div>

                    </div>

                    {appointments.length === 0 ? (

                        <div className="appointments-empty">
                            Aucun rendez-vous pour ce patient
                        </div>

                    ) : (

                        <div className="table-responsive">

                            <table className="details-appointments-table">

                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Statut</th>
                                        <th>Motif</th>
                                        <th>Notes</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {appointments.map(
                                        (appointment) => (

                                            <tr key={appointment.id}>

                                                <td>
                                                    {new Date(
                                                        appointment.appointmentDate
                                                    ).toLocaleString(
                                                        "fr-FR"
                                                    )}
                                                </td>

                                                <td>
                                                    <span
                                                        className={
                                                            `status-badge status-${appointment.status}`
                                                        }
                                                    >
                                                        {appointment.status}
                                                    </span>
                                                </td>

                                                <td>
                                                    {appointment.reason}
                                                </td>

                                                <td>
                                                    {appointment.notes || "-"}
                                                </td>

                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
}

export default PatientDetailsPage;