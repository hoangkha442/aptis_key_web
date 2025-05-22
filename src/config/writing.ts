import api from "./api";

export const writingService = {
  getAllWritingTests: () => api.get("writing/get-all-writing-tests"),
  getWritingTestById: (data: { writing_test_id: number }) =>
    api.post("writing/get-writing-by-id", data),
};
