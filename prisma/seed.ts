import { hashPassword } from "@/lib/auth";
import { db } from "@/lib/db";
import { TASK_STATUS } from "@prisma/client";

const getRandomTaskStatus = () => {
  const statuses = [
    TASK_STATUS.COMPLETED,
    TASK_STATUS.NOT_STARTED,
    TASK_STATUS.STARTED,
  ];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

async function main() {
  const hashKey = await hashPassword("password");
  const user = await db.user.upsert({
    where: { email: "john2@email.com" },
    update: {},
    create: {
      email: "john2@gmail.com",
      firstName: "John",
      lastName: "Doe",
      password: hashKey,
      projects: {
        create: new Array(5).fill(1).map((_, i) => ({
          name: `Project ${i}`,
          due: new Date(2022, 11, 25),
        })),
      },
    },
    include: {
      projects: true,
    },
  });

  const tasks = await Promise.all(
    user.projects.map((project) =>
      db.task.createMany({
        data: new Array(10).fill(1).map((_, i) => {
          return {
            name: `Task ${i}`,
            ownerId: user.id,
            projectId: project.id,
            description: `Everything that describes Task ${i}`,
            status: getRandomTaskStatus(),
          };
        }),
      })
    )
  );

  console.log({ user, tasks });
}
main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
