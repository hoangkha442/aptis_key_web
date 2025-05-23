import api from "./api";

export const speakingService = {
  getAllSpeakingKeys: () => api.get("speaking/get-all-speaking-key"),
  getSpeakingTestById: (data: { speaking_test_id: number }) =>
    api.post("speaking/speaking-id-test", data),
};
