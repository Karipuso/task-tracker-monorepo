import { useMutation, useQueryClient } from "react-query";
import { apis, queryKeys } from "@/api/index";

export const useSetTaskOrder = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (data: { source: number; destination: number; folder_id: string }) =>
      apis.setTaskOrder(data),
    {
      onSuccess: () => queryClient.invalidateQueries([queryKeys.FOLDER_LIST]),
    },
  );
};
