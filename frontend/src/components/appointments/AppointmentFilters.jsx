function AppointmentFilters({
    date,
    status,
    onDateChange,
    onStatusChange
}) {
    return (
        <div className="appointment-filters">

            <div className="filter-group">
                <label>Date</label>

                <input
                    type="date"
                    value={date}
                    onChange={(e) =>
                        onDateChange(e.target.value)
                    }
                />
            </div>

            <div className="filter-group">
                <label>Statut</label>

                <select
                    value={status}
                    onChange={(e) =>
                        onStatusChange(e.target.value)
                    }
                >
                    <option value="">
                        Tous
                    </option>

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

        </div>
    );
}

export default AppointmentFilters;