import { useMutation, useQueryClient } from "react-query";
import { apis, queryKeys } from "@/api/index";
import { IFolder } from "@/utils/interfaces";

export const useSetFolder = () => {
  const queryClient = useQueryClient();

  return useMutation((data: IFolder) => apis.setFolder(data), {
    onSuccess: () => queryClient.invalidateQueries([queryKeys.FOLDER_LIST]),
  });
};
