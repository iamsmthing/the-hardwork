"use client";
import { FC } from "react";
import { Prisma, TASK_STATUS } from "@prisma/client";
import Card from "./Card";
import clsx from "clsx";
import { EditIcon, TrashIcon } from "./TrashIcon";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { removeProject } from "@/lib/api";
const projectWithTasks = Prisma.validator<Prisma.ProjectDefaultArgs>()({
  include: { tasks: true },
});

type ProjectWithTasks = Prisma.ProjectGetPayload<typeof projectWithTasks>;

const format = (date: string | number | Date) => {
  return new Date(date).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
const ProjectCard: FC<{ project: ProjectWithTasks }> = ({ project }) => {
  const router = useRouter();

  const handleDelete = async (e: any) => {
    e.preventDefault();
    console.log("project:", project);
    await removeProject(project.id);
    router.refresh();
  };
  const completedCount = project.tasks.map((project) => {
    project.status === TASK_STATUS.COMPLETED;
  }).length;
  const progress = Math.ceil((completedCount / project.tasks.length) * 100);

  return (
    <Card className="!px-6 !py-8 hover:scale-105 transition-all ease-in-out duration-200">
      <div className="flex justify-between content-center">
        <span className="text-sm text-gray-800">
          {format(project.createdAt)}
        </span>
        <div className="flex justify-between content-center gap-2">
          <Button
            isIconOnly
            color="danger"
            aria-label="Like"
            onClick={handleDelete}
          >
            <TrashIcon />
          </Button>
          <Button isIconOnly color="success" aria-label="Like">
            <EditIcon />
          </Button>
        </div>
      </div>
      <div className="mb-6">
        <span className="text-3xl text-gray-600">{project.name}</span>
      </div>
      <div className="mb-2">
        <span className="text-gray-400">
          {completedCount}/{project.tasks.length} completed
        </span>
      </div>
      <div>
        <div className="w-full h-2 bg-violet-200 rounded-full mb-2">
          <div
            className={clsx(
              "h-full text-center text-xs text-white bg-violet-600 rounded-full"
            )}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-right">
          <span className="text-sm text-gray-600 font-semibold">
            {progress}%
          </span>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
