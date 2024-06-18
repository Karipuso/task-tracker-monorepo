import { ITask } from "@/utils/interfaces";
import { useSetTask } from "@/api/useSetTask";

const CheckCircle = ({ task }: { task: ITask }) => {
  const { mutateAsync, isLoading } = useSetTask();

  const handleCheck = async () => {
    if (!isLoading) {
      await mutateAsync({ ...task, state: !task.state });
    }
  };

  return (
    <button
      onClick={handleCheck}
      className={`bi ${task.state ? "bi-check-circle-fill" : "bi-circle"}`}
    ></button>
  );
};

export default CheckCircle;
