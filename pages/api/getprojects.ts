import { validateJWT } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function handler(req, res) {
  const user = await validateJWT(req.cookies[process.env.COOKIE_NAME]);
  const projects = await db.project.findMany({
    where: {
      ownerId: user?.id,
    },
  });

  res.json({ projects: projects });
}
