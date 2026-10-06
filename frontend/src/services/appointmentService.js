import apiClient from "../api/apiClient";

const getAppointments = async (filters = {}) => {
    const response = await apiClient.get(
        "/appointments",
        {
            params: filters
        }
    );

    return response.data;
};

const createAppointment = async (data) => {
    const response = await apiClient.post(
        "/appointments",
        data
    );

    return response.data;
};

const updateStatus = async (id, status) => {
    const response = await apiClient.patch(
        `/appointments/${id}/status`,
        {
            status
        }
    );

    return response.data;
};

export default {
    getAppointments,
    createAppointment,
    updateStatus
};