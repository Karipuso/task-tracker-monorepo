import { useMutation, useQueryClient } from "react-query";
import { ITask } from "@/utils/interfaces";
import { apis, queryKeys } from "@/api/index";

export const useSetTask = () => {
  const queryClient = useQueryClient();

  return useMutation((data: ITask) => apis.setTask(data), {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.TASK_LIST]);
      queryClient.invalidateQueries([queryKeys.FOLDER_LIST]);
    },
  });
};
