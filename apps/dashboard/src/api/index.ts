import { apiClient } from "@/api/apiClient";

export const apis = {
  async getFolders() {
    return (await apiClient.get("folder/list"))?.data;
  },
};

export const queryKeys = {
  FOLDER_LIST: "@queryKeys.FOLDER_LIST",
};
