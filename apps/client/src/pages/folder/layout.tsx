import { ReactNode } from "react";
import { useDarkMode } from "@/utils/DarkModeContext";
import Link from "next/link";
import InputColors from "@/components/InputColors";
import { ITask } from "@/utils/interfaces";
import { useSetTask } from "@/api/useSetTask";
import { useRouter } from "next/router";
import { useDeleteFolder } from "@/api/useDeleteFolder";

const Layout = ({
  children,
  folder,
}: {
  children: ReactNode;
  folder: string;
}) => {
  const { darkMode, setDarkMode } = useDarkMode();

  const router = useRouter();

  const { mutateAsync, isLoading } = useSetTask();
  const { mutateAsync: deleteAsync, isLoading: deleteLoading } =
    useDeleteFolder();

  const deleteFolder = async () => {
    if (!deleteLoading) {
      const res = await deleteAsync(folder);
      if (res?.success) {
        router.push("/");
      }
    }
  };

  const addTask = async (data: ITask) => {
    if (!isLoading) {
      const res = await mutateAsync({ ...data, folder });
      // if (res?.success) {
      //   router.push("/");
      // }
    }
  };

  return (
    <div className="h-full max-w-2xl mx-auto flex flex-col justify-between overflow-hidden">
      <div className="flex flex-col gap-5 overflow-auto">
        <nav className="flex justify-between items-center">
          <Link href="/" className="bi bi-chevron-left"></Link>
          <div className="flex gap-6">
            <button className="bi bi-trash3" onClick={deleteFolder}></button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="bi bi-moon"
            ></button>
          </div>
        </nav>
        {children}
      </div>

      <InputColors onSubmit={addTask} colorsOnTop={true} />
    </div>
  );
};

export default Layout;
