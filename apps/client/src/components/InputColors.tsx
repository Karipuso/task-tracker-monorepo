import { useState } from "react";
import { colors } from "@/utils/colors";
import { SubmitHandler, useForm } from "react-hook-form";
import { IFolder } from "@/utils/interfaces";

interface Props {
  onSubmit: (state: { name: string; color: string }) => void;
  colorsOnTop: boolean;
}

const InputColors = ({ onSubmit, colorsOnTop = true }: Props) => {
  const [state, setState] = useState({
    color: "neutral",
    showColors: false,
  });

  const { register, handleSubmit, reset, watch } = useForm<IFolder>();

  const name = watch("name");

  const submit: SubmitHandler<IFolder> = async (values) => {
    onSubmit({ name: values.name, color: state.color });
    setState((p) => ({ ...p, showColors: false }));
    reset();
  };

  // @ts-ignore
  return (
    <div
      className={`w-full flex ${colorsOnTop ? "flex-col" : "flex-col-reverse"}`}
    >
      <div
        className={`flex justify-evenly items-center gap-2 transition-all duration-300 ${state.showColors ? "opacity-100 py-5" : "opacity-0 p-0 h-0"}`}
      >
        {Object.entries(colors).map(([color, classes]) => (
          <button
            key={color}
            onClick={() => setState((p) => ({ ...p, color }))}
            type="button"
            className={`w-7 h-7 rounded-full border-2 transition duration-200 ${classes.border} ${state.color === color ? classes.bg : "bg-inherit"}`}
          ></button>
        ))}
      </div>

      <form
        onSubmit={handleSubmit(submit)}
        className="flex justify-between items-center px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 dark:text-gray-200"
      >
        <input
          {...register("name")}
          type="text"
          className="flex-1 bg-inherit"
          placeholder="Aa"
          required
        />
        <button
          type="button"
          onClick={() => setState((p) => ({ ...p, showColors: !p.showColors }))}
          className={`w-5 h-5 rounded-full transition duration-300 ${name ? colors[state.color].bg : colors[state.color].border}`}
        ></button>
      </form>
    </div>
  );
};

export default InputColors;
