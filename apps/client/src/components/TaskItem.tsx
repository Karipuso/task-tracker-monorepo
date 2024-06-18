import { ITask } from "@/utils/interfaces";
import { useSetTask } from "@/api/useSetTask";
import { SubmitHandler, useForm } from "react-hook-form";
import CheckCircle from "@/components/CheckCircle";
import { colors } from "@/utils/colors";
import { useEffect } from "react";

interface IForm {
  name: string;
}

const TaskItem = ({ task }: { task: ITask }) => {
  const { mutateAsync, isLoading } = useSetTask();
  const { register, handleSubmit, setValue } = useForm<IForm>({
    defaultValues: {
      name: task.name,
    },
  });

  const onSubmit: SubmitHandler<IForm> = async (values) => {
    if (!isLoading) {
      await mutateAsync({ ...task, ...values });
    }
  };

  useEffect(() => {
    if (task.name) {
      setValue("name", task.name);
    }
  }, [task.name]);

  return (
    <div className={`flex gap-2 ${colors[task.color].text}`}>
      <CheckCircle task={task} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} type="text" className="bg-inherit" />
      </form>
    </div>
  );
};

export default TaskItem;
