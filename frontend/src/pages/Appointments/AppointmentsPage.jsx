import { useEffect, useState } from "react";

import appointmentService from "../../services/appointmentService";

import AppointmentFilters from "../../components/appointments/AppointmentFilters";
import AppointmentForm from "../../components/appointments/AppointmentForm";
import AppointmentTable from "../../components/appointments/AppointmentTable";

import "./AppointmentsPage.css";

function AppointmentsPage() {
    const [appointments, setAppointments] =
        useState([]);

    const [date, setDate] = useState("");
    const [status, setStatus] = useState("");

    const [showForm, setShowForm] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const loadAppointments = async () => {
        try {
            setLoading(true);
            setError("");

            const filters = {};

            if (date) {
                filters.date = date;
            }

            if (status) {
                filters.status = status;
            }

            const data =
                await appointmentService.getAppointments(
                    filters
                );

            setAppointments(data);

        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.message ||
                "Impossible de charger les rendez-vous"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAppointments();
    }, [date, status]);

    const handleCreate = async (formData) => {
        try {
            setLoading(true);
            setError("");

            await appointmentService.createAppointment(
                formData
            );

            setShowForm(false);

            await loadAppointments();

        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.message ||
                "Erreur lors de la création du rendez-vous"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (
        id,
        newStatus
    ) => {
        try {
            setError("");

            await appointmentService.updateStatus(
                id,
                newStatus
            );

            await loadAppointments();

        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.message ||
                "Impossible de modifier le statut"
            );
        }
    };

    return (
        <div className="appointments-page">

            <div className="appointments-container">

                <div className="appointments-header">

                    <div>
                        <h1>Rendez-vous</h1>

                        <p>
                            Gérez les rendez-vous
                            de votre clinique
                        </p>
                    </div>

                    <button
                        className="add-appointment-button"
                        onClick={() =>
                            setShowForm(
                                (current) => !current
                            )
                        }
                    >
                        {showForm
                            ? "Fermer"
                            : "+ Nouveau rendez-vous"}
                    </button>

                </div>

                {error && (
                    <div className="appointments-error">
                        {error}
                    </div>
                )}

                {showForm && (
                    <div className="appointment-form-card">

                        <div className="appointment-form-header">
                            <h2>
                                Nouveau rendez-vous
                            </h2>

                            <p>
                                Renseignez les informations
                                du rendez-vous
                            </p>
                        </div>

                        <AppointmentForm
                            onSubmit={handleCreate}
                            loading={loading}
                        />

                    </div>
                )}

                <div className="appointments-filter-card">

                    <AppointmentFilters
                        date={date}
                        status={status}
                        onDateChange={setDate}
                        onStatusChange={setStatus}
                    />

                </div>

                <div className="appointments-table-card">

                    {loading && !showForm ? (

                        <div className="appointments-loading">
                            Chargement...
                        </div>

                    ) : (

                        <AppointmentTable
                            appointments={appointments}
                            onStatusChange={
                                handleStatusChange
                            }
                        />

                    )}

                </div>

            </div>

        </div>
    );
}

export default AppointmentsPage;