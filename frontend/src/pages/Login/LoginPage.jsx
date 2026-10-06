import { useState } from "react";
import { useNavigate } from "react-router-dom";

import authService from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import "./LoginPage.css";

function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            const result = await authService.login(
                email,
                password
            );

            login(
                result.user,
                result.token
            );

            navigate("/dashboard");

        } catch (error) {
            console.error("Erreur login :", error);

            setError(
                error.response?.data?.message ||
                "Erreur de connexion"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">

                <div className="login-brand">
                    <div className="brand-icon">
                        +
                    </div>

                    <h1>ClinicFlow</h1>

                    <p>
                        Gestion simple et efficace
                        de votre clinique
                    </p>
                </div>

                <div className="login-card">
                    <div className="login-header">
                        <h2>Bienvenue</h2>

                        <p>
                            Connectez-vous pour accéder
                            à votre espace
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label htmlFor="email">
                                Adresse email
                            </label>

                            <input
                                id="email"
                                type="email"
                                placeholder="admin@clinicflow.com"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">
                                Mot de passe
                            </label>

                            <input
                                id="password"
                                type="password"
                                placeholder="Votre mot de passe"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                required
                            />
                        </div>

                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="login-button"
                            disabled={loading}
                        >
                            {loading
                                ? "Connexion..."
                                : "Se connecter"}
                        </button>

                    </form>
                </div>

            </div>
        </div>
    );
}

export default LoginPage;