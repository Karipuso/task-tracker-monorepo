import { IFolder, ITask } from "@/utils/interfaces";
import { useMemo } from "react";

const Item = ({
  value,
  title,
  icon,
}: {
  icon: string;
  title: string;
  value: number | string;
}) => {
  return (
    <div className="flex items-center gap-3">
      <div className="rounded-full flex items-center justify-center border border-1 border-blue-600 text-blue-600 bg-blue-100 aspect-square w-10">
        <i className={`bi ${icon}`}></i>
      </div>

      <div>
        <p className="text-xs text-gray-500">{title}</p>
        <p className="text-xl">{value}</p>
      </div>
    </div>
  );
};

const Overall = ({ folders }: { folders: IFolder[] }) => {
  const taskData = useMemo(() => {
    const allTasks =
      folders?.flatMap((item: IFolder) => [...(item.tasks || [])]) || [];

    return {
      total: allTasks.length,
      complete: allTasks.filter((task: ITask) => task.state).length,
      incomplete: allTasks.filter((task: ITask) => !task.state).length,
    };
  }, [folders]);

  return (
    <div className="flex w-full justify-between border border-1 rounded-2xl p-4 flex-wrap drop-shadow-sm">
      <Item icon="bi-folder" title="Total Boards" value={folders?.length} />
      <Item icon="bi-at" title="Total Tasks" value={taskData.total} />
      <Item
        icon="bi-check-circle"
        title="Completed Tasks"
        value={taskData.complete}
      />
      <Item
        icon="bi-file"
        title="Incomplete Tasks"
        value={taskData.incomplete}
      />
    </div>
  );
};

export default Overall;
