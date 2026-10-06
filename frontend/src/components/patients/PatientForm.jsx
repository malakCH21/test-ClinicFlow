import { useEffect, useState } from "react";

function PatientForm({
    initialData = null,
    onSubmit,
    loading = false
}) {
    const [formData, setFormData] = useState({
        fullName: "",
        cin: "",
        phone: "",
        birthDate: "",
        address: ""
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                fullName: initialData.fullName || "",
                cin: initialData.cin || "",
                phone: initialData.phone || "",
                birthDate: initialData.birthDate
                    ? initialData.birthDate.substring(0, 10)
                    : "",
                address: initialData.address || ""
            });
        }
    }, [initialData]);

    const handleChange = (event) => {
        const { name, value } = event.target;

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
            className="patient-form"
            onSubmit={handleSubmit}
        >
            <div className="patient-form-grid">

                <div className="form-group">
                    <label htmlFor="fullName">
                        Nom complet
                    </label>

                    <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="Ex : Sara Amrani"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="cin">
                        CIN
                    </label>

                    <input
                        id="cin"
                        name="cin"
                        type="text"
                        placeholder="Ex : AB123456"
                        value={formData.cin}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phone">
                        Téléphone
                    </label>

                    <input
                        id="phone"
                        name="phone"
                        type="text"
                        placeholder="Ex : 0612345678"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="birthDate">
                        Date de naissance
                    </label>

                    <input
                        id="birthDate"
                        name="birthDate"
                        type="date"
                        value={formData.birthDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group full-width">
                    <label htmlFor="address">
                        Adresse
                    </label>

                    <input
                        id="address"
                        name="address"
                        type="text"
                        placeholder="Adresse du patient"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </div>

            </div>

            <button
                type="submit"
                className="patient-submit-button"
                disabled={loading}
            >
                {loading
                    ? "Enregistrement..."
                    : "Enregistrer"}
            </button>
        </form>
    );
}

export default PatientForm;