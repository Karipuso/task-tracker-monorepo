import { useMutation, useQueryClient } from "react-query";
import { apis, queryKeys } from "@/api/index";

export const useDeleteFolder = () => {
  const queryClient = useQueryClient();
  return useMutation((data: string) => apis.deleteFolder(data), {
    onSuccess: () => queryClient.invalidateQueries([queryKeys.FOLDER_LIST]),
  });
};
