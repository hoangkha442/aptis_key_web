import api from "./api";

export const userServices = {
  updateUser: (id: number, data: any) =>
    api.put(`/user/${id}`, data),
};
