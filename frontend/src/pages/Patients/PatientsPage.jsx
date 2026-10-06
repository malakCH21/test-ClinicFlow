import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import patientService from "../../services/patientService";

import "./PatientsPage.css";

function PatientsPage() {
    const navigate = useNavigate();

    const [patients, setPatients] = useState([]);

    const [search, setSearch] = useState("");

    const [page, setPage] = useState(1);
    const [limit] = useState(5);

    const [totalPages, setTotalPages] = useState(1);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const loadPatients = async () => {
        try {
            setLoading(true);
            setError("");

            const result = await patientService.getPatients(
                search,
                page,
                limit
            );

            setPatients(result.data);
            setTotalPages(result.pagination.totalPages);

        } catch (error) {
            console.error("Erreur patients :", error);

            setError(
                error.response?.data?.message ||
                "Impossible de charger les patients"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPatients();
    }, [search, page]);

    const handleSearch = (event) => {
        setSearch(event.target.value);
        setPage(1);
    };

    return (
        <div className="patients-page">

            <div className="patients-container">

                <div className="patients-header">

                    <div>
                        <h1>Patients</h1>

                        <p>
                            Gérez les patients de votre clinique
                        </p>
                    </div>

                    <button
                        className="add-patient-button"
                        onClick={() =>
                            navigate("/patients/new")
                        }
                    >
                        + Ajouter un patient
                    </button>

                </div>

                <div className="patients-toolbar">

                    <div className="patient-search">

                        <input
                            type="text"
                            placeholder="Rechercher par nom ou CIN..."
                            value={search}
                            onChange={handleSearch}
                        />

                    </div>

                </div>

                {error && (
                    <div className="patients-error">
                        {error}
                    </div>
                )}

                <div className="patients-table-card">

                    {loading ? (

                        <div className="patients-loading">
                            Chargement...
                        </div>

                    ) : patients.length === 0 ? (

                        <div className="patients-empty">
                            Aucun patient trouvé
                        </div>

                    ) : (

                        <div className="table-responsive">

                            <table className="patients-table">

                                <thead>
                                    <tr>
                                        <th>Nom complet</th>
                                        <th>CIN</th>
                                        <th>Téléphone</th>
                                        <th>Date de naissance</th>
                                        <th>Adresse</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {patients.map((patient) => (

                                        <tr key={patient.id}>

                                            <td className="patient-name">
                                                {patient.fullName}
                                            </td>

                                            <td>
                                                {patient.cin}
                                            </td>

                                            <td>
                                                {patient.phone}
                                            </td>

                                            <td>
                                                {patient.birthDate
                                                    ? new Date(
                                                        patient.birthDate
                                                    ).toLocaleDateString(
                                                        "fr-FR"
                                                    )
                                                    : "-"
                                                }
                                            </td>

                                            <td>
                                                {patient.address || "-"}
                                            </td>

                                            <td>
                                                <div className="patient-actions">

                                                    <button
                                                        className="view-button"
                                                        onClick={() =>
                                                            navigate(
                                                                `/patients/${patient.id}`
                                                            )
                                                        }
                                                    >
                                                        Voir
                                                    </button>

                                                    <button
                                                        className="edit-button"
                                                        onClick={() =>
                                                            navigate(
                                                                `/patients/${patient.id}/edit`
                                                            )
                                                        }
                                                    >
                                                        Modifier
                                                    </button>

                                                </div>
                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    )}

                    <div className="pagination">

                        <button
                            disabled={page === 1}
                            onClick={() =>
                                setPage((current) =>
                                    current - 1
                                )
                            }
                        >
                            Précédent
                        </button>

                        <span>
                            Page {page} sur {totalPages || 1}
                        </span>

                        <button
                            disabled={
                                page >= totalPages ||
                                totalPages === 0
                            }
                            onClick={() =>
                                setPage((current) =>
                                    current + 1
                                )
                            }
                        >
                            Suivant
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default PatientsPage;