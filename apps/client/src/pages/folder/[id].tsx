import Layout from "@/pages/folder/layout";
import { useRouter } from "next/router";
import { useGetFolderList } from "@/api/useGetFolderList";
import { useMemo, useState } from "react";
import { IFolder, ITask } from "@/utils/interfaces";
import { SubmitHandler, useForm } from "react-hook-form";
import TaskItem from "@/components/TaskItem";
import { useSetFolder } from "@/api/useSetFolder";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { useSetTaskOrder } from "@/api/useSetTaskOrder";
import { useDeleteTask } from "@/api/useDeleteTask";
import task from "backend/src/models/task";

interface IForm {
  name: String;
}

const Folder = () => {
  const [isDragging, setIsDragging] = useState(false);
  const { query } = useRouter();
  const { id } = query || {};
  const { data } = useGetFolderList();
  const { mutateAsync, isLoading } = useSetFolder();
  const { mutateAsync: orderAsync, isLoading: orderLoading } =
    useSetTaskOrder();
  const { mutateAsync: deleteAsync, isLoading: deleteLoading } =
    useDeleteTask();

  const { folders } = data || {};

  const folder = useMemo(
    () => folders?.find((c: IFolder) => c._id === id) || {},
    [folders, id],
  );

  const { register, handleSubmit } = useForm<IForm>({
    defaultValues: {
      name: folder.name,
    },
  });

  const editFolder: SubmitHandler<IForm> = async (values) => {
    if (!isLoading) {
      await mutateAsync({ ...folder, ...values });
    }
  };

  const onDragEnd = async (result: DropResult) => {
    if (result.destination?.droppableId === "droppable-trash") {
      if (!deleteLoading) {
        await deleteAsync(
          folder.tasks.find((c: ITask) => c._id === result.draggableId),
        );
      }
    } else {
      if (!orderLoading) {
        const data: {
          source: number;
          destination: number;
          folder_id: string;
        } = {
          source: result.source.index,
          destination: result.destination?.index as number,
          folder_id: folder._id,
        };
        await orderAsync(data);
      }
    }
    setIsDragging(false);
  };

  return (
    <Layout folder={id as string}>
      <div className="flex flex-col gap-4">
        <form onSubmit={handleSubmit(editFolder)}>
          <input
            {...register("name")}
            type="text"
            className="text-2xl font-medium bg-inherit"
          />
        </form>

        <DragDropContext
          onDragEnd={onDragEnd}
          onDragStart={() => setIsDragging(true)}
        >
          <Droppable droppableId="droppable-tasks">
            {(provided, snapshot) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {folder.tasks?.map((item: ITask, index: number) => (
                  <Draggable
                    draggableId={item._id as string}
                    index={index}
                    key={item._id}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="flex items-center justify-between gap-3"
                      >
                        <TaskItem task={item} key={index} />
                        <div className="bi bi-grip-vertical text-xl opacity-40"></div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <Droppable droppableId="droppable-trash">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`mt-10 py-10 relative rounded-2xl transition duration-200 ${snapshot.isDraggingOver ? "bg-gray-100/70 dark:bg-gray-800/70" : ""} ${isDragging ? "visible" : "invisible"}`}
              >
                <div className="absolute inset-0 flex justify-center items-center">
                  <i className="bi bi-trash text-3xl text-gray-400 dark:text-gray-600"></i>
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </Layout>
  );
};

export default Folder;
