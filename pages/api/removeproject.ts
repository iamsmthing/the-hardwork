import { validateJWT } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function handler(req, res) {
  const user = await validateJWT(req.cookies[process.env.COOKIE_NAME]);
  const project = await db.project.findUnique({
    where: {
      id: req.body.id,
    },
  });
  console.log(project);
  if (project) {
    await db.task.deleteMany({
      where: {
        projectId: project.id,
      },
    });
    await db.project.delete({
      where: {
        id: req.body.id,
        ownerId: user.id,
      },
    });
  }

  res.json({ message: `Project ${project?.name} Deleted` });
}
