import axiosClient from "./axiosClient";

const memoApi = {
  create: async () => await axiosClient.post("/memo"),
  getAll: async () => await axiosClient.get("/memo"),
  get: async (id) => await axiosClient.get(`/memo/${id}`),
  delete: async (id) => await axiosClient.delete(`/memo/${id}`),
  update: async (id, body) => await axiosClient.put(`/memo/${id}`, body),
};

export default memoApi;