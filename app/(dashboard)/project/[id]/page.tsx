import Card from "@/components/Card";
import NewTask from "@/components/NewTask";
import TaskCard from "@/components/TaskCard";
import { delay } from "@/lib/async";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import React, { Suspense } from "react";

interface Props {
  params: { id: string };
}
const getData = async (params: string) => {
  const user = await getUserFromCookie(cookies());
  if (user) {
    const tasks = await db.project.findUnique({
      where: {
        id: params,
        ownerId: user.id,
      },
      include: {
        tasks: true,
      },
    });
    // console.log("id:", params);
    // console.log("project name:", tasks[0].project.name);
    // const projectName = tasks[0].project.name;
    return tasks;
  }
};

export default async function ProjectPage({ params: { id } }: Props) {
  // const tasks: any = await getD(ata(id);
  const project: any = await getData(id);
  console.log("project:", project);
  return (
    <Card className="w-full py-2 relative mx-1 block bg-slate-800">
      <div className="mb-4 flex content-center justify-between">
        <h1 className="text-3xl text-gray-50 font-bold mb-4">{project.name}</h1>
        <NewTask id={project.id} />
      </div>
      <h4 className="text-xl text-gray-400">Tasks</h4>
      <div className="flex flex-wrap">
        {project.tasks?.map(
          (task: { id: string; name: string; status: string }) => (
            <div className="w-1/3 p-1" key={task.id}>
              <Suspense
                fallback={
                  <div className="items-center justify-center">
                    Loading Project.......
                  </div>
                }
              >
                <TaskCard task={task} />
              </Suspense>
            </div>
          )
        )}
      </div>
    </Card>
  );
}
