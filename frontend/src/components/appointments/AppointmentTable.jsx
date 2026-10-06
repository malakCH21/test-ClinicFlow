function AppointmentTable({
    appointments,
    onStatusChange
}) {
    if (appointments.length === 0) {
        return (
            <div className="appointments-empty">
                Aucun rendez-vous trouvé
            </div>
        );
    }

    return (
        <div className="table-responsive">

            <table className="appointments-table">

                <thead>
                    <tr>
                        <th>Patient</th>
                        <th>Date</th>
                        <th>Statut</th>
                        <th>Motif</th>
                        <th>Notes</th>
                        <th>Changer statut</th>
                    </tr>
                </thead>

                <tbody>

                    {appointments.map(
                        (appointment) => (

                            <tr key={appointment.id}>

                                <td className="appointment-patient">
                                    {appointment.patientName}
                                </td>

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

                                <td>
                                    <select
                                        className="status-select"
                                        value={appointment.status}
                                        onChange={(e) =>
                                            onStatusChange(
                                                appointment.id,
                                                e.target.value
                                            )
                                        }
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
                                </td>

                            </tr>

                        )
                    )}

                </tbody>

            </table>

        </div>
    );
}

export default AppointmentTable;