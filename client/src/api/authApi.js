import axiosClient from "./axiosClient";

const authApi = {
  register: async (params) => await axiosClient.post("/auth/register", params),
  login: async (params) => await axiosClient.post("/auth/login", params),
  verifyToken: async () => await axiosClient.post("/auth/verify-token"),
};

export default authApi;