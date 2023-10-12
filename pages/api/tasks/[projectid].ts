import { validateJWT } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function handler(req, res) {
  const user = await validateJWT(req.cookies[process.env.COOKIE_NAME]);
  const projectId = req.query;
  const { projectid } = projectId;
  console.log("projectId:", projectId);
  if (user) {
    const tasks = await db.task.findMany({
      where: {
        projectId: projectid,
        ownerId: user?.id,
      },
    });
    res.json({ tasks: tasks });
  }
}
