import api from "./api";

export const readingService = {
  getAllReadingKeys: () => api.get("reading/get-all-reading-key"),
  getReadingKeyTest: (data: { reading_test_id: number }) =>
    api.post("reading/reading-id-test", data)
  
};
// const getReadingKeyTest = async (keyTestId: number) => {
//     return await api.get(`reading-key-test/${keyTestId}`)
// }

// export { getReadingKeyTest };
