import apiClient from "../api/apiClient";

const getDashboard = async () => {
    const response = await apiClient.get(
        "/dashboard"
    );

    return response.data;
};

const dashboardService = {
    getDashboard
};

export default dashboardService;