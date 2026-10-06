import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import dashboardService from "../../services/dashboardService";
import StatCard from "../../components/dashboard/StatCard";
import { useAuth } from "../../context/AuthContext";

import "./DashboardPage.css";

function DashboardPage() {
    const navigate = useNavigate();
    const { logout, user } = useAuth();

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const data =
                    await dashboardService.getDashboard();

                setDashboard(data);

            } catch (error) {
                console.error(
                    "Erreur dashboard :",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Impossible de charger le dashboard"
                );
            } finally {
                setLoading(false);
            }
        };

        loadDashboard();
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const goToPatients = () => {
        navigate("/patients");
    };

    if (loading) {
        return (
            <div className="dashboard-message">
                Chargement...
            </div>
        );
    }

    if (error) {
        return (
            <div className="dashboard-error">
                {error}
            </div>
        );
    }

    return (
        <div className="dashboard-page">

            <div className="dashboard-header">

                <div>
                    <h1>
                        Dashboard ClinicFlow
                    </h1>

                    <p>
                        Vue d'ensemble de votre clinique
                    </p>

                    {user && (
                        <span className="dashboard-user">
                            Connecté : {user.email}
                        </span>
                    )}
                </div>

                <div className="dashboard-header-actions">

                    <button
                        className="patients-button"
                        onClick={goToPatients}
                    >
                        Gérer les patients
                    </button>

                    <button
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        Déconnexion
                    </button>

                </div>

            </div>

            <div className="dashboard-stats">

                <StatCard
                    title="Total patients"
                    value={
                        dashboard?.totalPatients ??
                        dashboard?.total_patients ??
                        0
                    }
                />

                <StatCard
                    title="Rendez-vous du jour"
                    value={
                        dashboard?.todayAppointments ??
                        dashboard?.today_appointments ??
                        0
                    }
                />

                <StatCard
                    title="En attente"
                    value={
                        dashboard?.pending ??
                        dashboard?.pending_appointments ??
                        0
                    }
                />

                <StatCard
                    title="Confirmés"
                    value={
                        dashboard?.confirmed ??
                        dashboard?.confirmed_appointments ??
                        0
                    }
                />

            </div>

            <div className="dashboard-shortcuts">

                <h2>Accès rapides</h2>

                <div className="shortcut-cards">

                    <button
                        className="shortcut-card"
                        onClick={goToPatients}
                    >
                        <span className="shortcut-icon">
                            👥
                        </span>

                        <span className="shortcut-title">
                            Patients
                        </span>

                        <span className="shortcut-description">
                            Consulter et gérer les patients
                        </span>
                    </button>

                </div>

            </div>

        </div>
    );
}

export default DashboardPage;