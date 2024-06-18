import { apiClient } from "@/api/apiClient";
import { IFolder, ITask } from "@/utils/interfaces";

export const apis = {
  async getFolders() {
    return (await apiClient.get("folder/list"))?.data;
  },
  async setFolder(data: IFolder) {
    return (await apiClient.post("folder/set", data))?.data;
  },
  async deleteFolder(folder_id: string) {
    return (await apiClient.post("folder/delete", { folder_id }))?.data;
  },
  async setTask(data: ITask) {
    return (await apiClient.post("task/set", data))?.data;
  },
  async setTaskOrder(data: {
    source: number;
    destination: number;
    folder_id: string;
  }) {
    return (await apiClient.post("task/set_order", data))?.data;
  },
  async deleteTask(data: ITask) {
    return (await apiClient.post("task/delete", data))?.data;
  },
};

export const queryKeys = {
  FOLDER_LIST: "@queryKeys.FOLDER_LIST",
};
