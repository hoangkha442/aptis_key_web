import api from "./api";

export const authServices = {
  login: (credentials: { email: string; password: string }) =>
    api.post("auth/login", credentials),

  getUserInfo: (token: string) =>
    api.get("auth/get-info", {
      headers: { Authorization: `Bearer ${token}` },
    }),
};
