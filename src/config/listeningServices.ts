import api from "./api";

export const listeningService = {
  getAllListeningKeys: () => api.get("listening/get-all-listening-key"),
  getListeningTestById: (data: { listening_test_id: number }) =>
    api.post("listening/listening-id-test", data),
};