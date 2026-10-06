import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import LoginPage from "../pages/Login/LoginPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import PatientsPage from "../pages/Patients/PatientsPage";
import PatientFormPage from "../pages/Patients/PatientFormPage";
import PatientDetailsPage from "../pages/Patients/PatientDetailsPage";
import AppointmentsPage from "../pages/Appointments/AppointmentsPage";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={
                        <Navigate
                            to="/dashboard"
                            replace
                        />
                    }
                />

                <Route
                    path="/login"
                    element={<LoginPage />}
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/patients"
                    element={
                        <ProtectedRoute>
                            <PatientsPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/patients/new"
                    element={
                        <ProtectedRoute>
                            <PatientFormPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/patients/:id/edit"
                    element={
                        <ProtectedRoute>
                            <PatientFormPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/patients/:id"
                    element={
                        <ProtectedRoute>
                            <PatientDetailsPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/appointments"
                    element={
                        <ProtectedRoute>
                            <AppointmentsPage />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;