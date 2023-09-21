import { FC } from "react";
import { Prisma } from "@prisma/client";
import Card from "./Card";
import clsx from "clsx";

const projectWithTasks = Prisma.validator<Prisma.ProjectDefaultArgs>()({
  include: { tasks: true },
});

type ProjectWithTasks = Prisma.ProjectGetPayload<typeof projectWithTasks>;

const format = (date: string | number | Date) => {
  new Date(date).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
const ProjectCard: FC<{ project: ProjectWithTasks }> = ({ project }) => {};
