import apiClient from "../api/apiClient";

const login = async (
    email,
    password
) => {
    const response =
        await apiClient.post(
            "/auth/login",
            {
                email,
                password
            }
        );

    return response.data;
};

const getMe = async () => {
    const response =
        await apiClient.get(
            "/auth/me"
        );

    return response.data;
};

const authService = {
    login,
    getMe
};

export default authService;