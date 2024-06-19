import Layout from "@/pages/Layout";
import { useGetFolderList } from "@/api/useGetFolderList";
import Overall from "@/components/Overall";
import PieChart from "@/components/PieChart";
import { useMemo } from "react";
import { IFolder, ITask } from "@/utils/interfaces";

export default function Home() {
  const { data } = useGetFolderList();

  const { folders } = data || {};

  const boardData = useMemo(() => {
    return [
      {
        value: folders?.filter((folder: IFolder) =>
          folder.tasks?.every((task: ITask) => task.state),
        ).length,
        name: "Complete",
      },
      {
        value: folders?.filter(
          (folder: IFolder) =>
            folder.tasks?.length &&
            folder.tasks?.every((task: ITask) => !task.state),
        ).length,
        name: "Incomplete",
      },
      {
        value: folders?.filter(
          (folder: IFolder) =>
            folder.tasks?.length &&
            folder.tasks?.some((task: ITask) => !task.state) &&
            folder.tasks?.some((task: ITask) => task.state),
        ).length,
        name: "In Progress",
      },
    ];
  }, [folders]);

  const taskData = useMemo(() => {
    const allTasks =
      folders?.flatMap((item: IFolder) => [...(item.tasks || [])]) || [];

    return [
      {
        value: allTasks.filter((task: ITask) => task.state).length,
        name: "Complete",
      },
      {
        value: allTasks.filter((task: ITask) => !task.state).length,
        name: "Incomplete",
      },
    ];
  }, [folders]);

  return (
    <Layout>
      <Overall folders={folders} />

      <div className="flex flex-row items-center, justify-between gap-4 flex-wrap">
        <PieChart name="Total Boards done" data={boardData} />
        <PieChart name="Total Tasks done" data={taskData} />
      </div>
    </Layout>
  );
}
