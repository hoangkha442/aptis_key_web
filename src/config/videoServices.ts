import api from "./api";


export const videoServices = {
  getVideoStream: (folderId: string) =>
    api.get(`auth/videos?folderId=${folderId}`)
};