import { ProjectTypes } from "@/types/RootTypes";
import Link from "next/link";

function ProjectCard({ title, object, solution, result, image }: ProjectTypes) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 gap-8 my-10 bg-gray-200 rounded-2xl overflow-hidden border border-gray-400 min-h-[500px]`}
    >
      <div
        className={`flex flex-col space-y-4 items-start justify-center p-10`}
      >
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <h3 className="text-md text-gray-700 font-semibold">
          Объект: <span className="font-normal text-red-600">{object}</span>
        </h3>
        <h3 className="text-md text-gray-700 font-semibold">
          Решение: <span className="font-normal">{solution}</span>
        </h3>
        <h3 className="text-md text-gray-700 font-semibold">
          Результат: <span className="font-normal">{result}</span>
        </h3>
        <Link
          href={``}
          className="bg-[#173F5F] text-white rounded-lg py-2 px-6"
        >
          Узнать больше
        </Link>
      </div>
      <div className="h-full">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
    </div>
  );
}

export default ProjectCard;
