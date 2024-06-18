import { useQuery } from "react-query";
import { apis, queryKeys } from "@/api/index";

export const useGetFolderList = () => {
  return useQuery([queryKeys.FOLDER_LIST], apis.getFolders);
};
