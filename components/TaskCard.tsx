import React from "react";
import Card from "./Card";
import Button from "./Button";

const format = (date: string | number | Date) => {
  return new Date(date).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const TaskCard = ({ task }: any) => {
  const { id, name, description, status, createdAt } = task;
  console.log("id,name,dec:", id, name, description);
  return (
    <Card className="">
      {/* <div className="flex justify-between items-center">
        <div>
          <span className="text-3xl text-gray-600">{task.name}</span>
        </div>
        <div>
          <Button intent="text" className="text-violet-600">
            + Create New
          </Button>
        </div>
      </div> */}
      <div>
        {name ? (
          <div>
            <div className="py-2 ">
              <div className="flex justify-between items-center">
                <span className="text-2xl text-gray-600">{name}</span>
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
              </div>
              <div className="block">
                <span className="text-gray-600 text-sm">{description}</span>
              </div>
              <p className="text-gray-400 text-sm"> {format(createdAt)}</p>
            </div>
          </div>
        ) : (
          <div>no tasks</div>
        )}
      </div>
    </Card>
  );
};

export default TaskCard;
