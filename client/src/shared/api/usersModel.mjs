import { apiClient, modelResponse } from "./base.mjs";

export const usersModel = {
    register: async (body) => {
        try {
            const response = await apiClient.post("/users/register", body);
            return modelResponse(response.status, response.data);
        } catch (error) {
            return modelResponse(error.response.status, error.response.data);
        }
    },

    login: async (body) => {
        try {
            const response = await apiClient.post("/users/login", body);
            return modelResponse(response.status, response.data);
        } catch (error) {
            return modelResponse(error.response.status, error.response.data);
        }
    },
};