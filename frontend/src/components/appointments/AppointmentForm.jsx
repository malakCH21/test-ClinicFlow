import { useEffect, useState } from "react";

import patientService from "../../services/patientService";

function AppointmentForm({
    onSubmit,
    loading = false
}) {
    const [patients, setPatients] = useState([]);

    const [formData, setFormData] = useState({
        patientId: "",
        appointmentDate: "",
        status: "pending",
        reason: "",
        notes: ""
    });

    useEffect(() => {
        const loadPatients = async () => {
            try {
                const result =
                    await patientService.getPatients(
                        "",
                        1,
                        100
                    );

                setPatients(result.data);

            } catch (error) {
                console.error(
                    "Erreur chargement patients",
                    error
                );
            }
        };

        loadPatients();
    }, []);

    const handleChange = (event) => {
        const {
            name,
            value
        } = event.target;

        setFormData((current) => ({
            ...current,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        onSubmit(formData);
    };

    return (
        <form
            className="appointment-form"
            onSubmit={handleSubmit}
        >

            <div className="appointment-form-grid">

                <div className="form-group">
                    <label>
                        Patient
                    </label>

                    <select
                        name="patientId"
                        value={formData.patientId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">
                            Sélectionner un patient
                        </option>

                        {patients.map(
                            (patient) => (
                                <option
                                    key={patient.id}
                                    value={patient.id}
                                >
                                    {patient.fullName}
                                    {" - "}
                                    {patient.cin}
                                </option>
                            )
                        )}

                    </select>
                </div>

                <div className="form-group">
                    <label>
                        Date et heure
                    </label>

                    <input
                        type="datetime-local"
                        name="appointmentDate"
                        value={
                            formData.appointmentDate
                        }
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>
                        Statut
                    </label>

                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="pending">
                            Pending
                        </option>

                        <option value="confirmed">
                            Confirmed
                        </option>

                        <option value="cancelled">
                            Cancelled
                        </option>
                    </select>
                </div>

                <div className="form-group">
                    <label>
                        Motif
                    </label>

                    <input
                        type="text"
                        name="reason"
                        placeholder="Ex : Consultation générale"
                        value={formData.reason}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group full-width">
                    <label>
                        Notes
                    </label>

                    <textarea
                        name="notes"
                        placeholder="Notes complémentaires..."
                        value={formData.notes}
                        onChange={handleChange}
                        rows="4"
                    />
                </div>

            </div>

            <button
                type="submit"
                className="appointment-submit-button"
                disabled={loading}
            >
                {loading
                    ? "Création..."
                    : "Créer le rendez-vous"}
            </button>

        </form>
    );
}

export default AppointmentForm;