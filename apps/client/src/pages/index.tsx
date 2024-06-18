import Layout from "@/pages/Layout";
import { useGetFolderList } from "@/api/useGetFolderList";
import Link from "next/link";
import { useSetFolder } from "@/api/useSetFolder";
import InputColors from "@/components/InputColors";
import { colors } from "@/utils/colors";
import { IFolder } from "@/utils/interfaces";

export default function Home() {
  const { data } = useGetFolderList();
  const { mutateAsync, isLoading } = useSetFolder();

  const { folders } = data || {};

  const addFolder = async (values: IFolder) => {
    if (!isLoading) {
      await mutateAsync(values);
    }
  };

  console.log(folders);

  return (
    <Layout>
      <InputColors onSubmit={addFolder} colorsOnTop={false} />

      {folders?.length > 0 && (
        <main className="flex flex-wrap gap-3">
          {folders.map((item: IFolder, index: number) => (
            <Link
              href={`folder/${item._id}`}
              key={index}
              className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-5"
            >
              <div
                className={`text-xl whitespace-nowrap font-medium ${colors[item.color].text}`}
              >
                {item.name}
              </div>
            </Link>
          ))}
        </main>
      )}
    </Layout>
  );
}
