import apiClient from "../api/apiClient";

const getPatients = async (
    search = "",
    page = 1,
    limit = 5
) => {
    const response = await apiClient.get(
        "/patients",
        {
            params: {
                search,
                page,
                limit
            }
        }
    );

    return response.data;
};

const getPatientById = async (id) => {
    const response = await apiClient.get(
        `/patients/${id}`
    );

    return response.data;
};

const createPatient = async (data) => {
    const response = await apiClient.post(
        "/patients",
        data
    );

    return response.data;
};

const updatePatient = async (id, data) => {
    const response = await apiClient.put(
        `/patients/${id}`,
        data
    );

    return response.data;
};

const deletePatient = async (id) => {
    const response = await apiClient.delete(
        `/patients/${id}`
    );

    return response.data;
};

export default {
    getPatients,
    getPatientById,
    createPatient,
    updatePatient,
    deletePatient
};