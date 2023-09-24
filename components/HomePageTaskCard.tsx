import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { TASK_STATUS } from "@prisma/client";
import { cookies } from "next/headers";
import Button from "./Button";
import Card from "./Card";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  PromiseLikeOfReactNode,
} from "react";

const getData = async () => {
  const user = await getUserFromCookie(cookies());
  const tasks = await db.task.findMany({
    where: {
      ownerId: user?.id,
      NOT: {
        status: TASK_STATUS.COMPLETED,
        deleted: false,
      },
    },
    take: 5,
    orderBy: {
      due: "asc",
    },
  });

  return tasks;
};
const TaskCard = async ({ title, tasks }: any) => {
  const data = tasks || (await getData());

  return (
    <Card className="">
      <p className="text-3xl">Recent Tasks</p>
      <div className="flex justify-between items-center">
        <div>
          <span className="text-3xl text-gray-600">{title}</span>
        </div>
        {/* <div>
          <Button intent="text" className="text-violet-600">
            + Create New
          </Button>
        </div> */}
      </div>
      <div>
        {data && data.length ? (
          <div>
            {data.map(
              (task: {
                name:
                  | string
                  | number
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | PromiseLikeOfReactNode
                  | null
                  | undefined;
                description:
                  | string
                  | number
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | PromiseLikeOfReactNode
                  | null
                  | undefined;
              }) => (
                <div className="py-2 ">
                  <div className="flex content-start justify-between">
                    <span className="text-gray-800">{task.name}</span>
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-700 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-700"></span>
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">
                      {task.description}
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          <div>no tasks</div>
        )}
      </div>
    </Card>
  );
};

export default TaskCard;
