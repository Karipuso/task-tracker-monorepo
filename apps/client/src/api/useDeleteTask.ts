import { useMutation, useQueryClient } from "react-query";
import { apis, queryKeys } from "@/api/index";
import { ITask } from "@/utils/interfaces";

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation((data: ITask) => apis.deleteTask(data), {
    onSuccess: () => queryClient.invalidateQueries([queryKeys.FOLDER_LIST]),
  });
};
