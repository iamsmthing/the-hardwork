import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { createJWT, hashPassword } from "@/lib/auth";
import { serialize } from "cookie";

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const hashKey = await hashPassword(req.body.password);
    const user = await db.user.create({
      data: {
        email: req.body.email,
        password: hashKey,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      },
    });

    const jwt = await createJWT(user);
    res.setHeader(
      "Set-Cookie",
      serialize(process.env.COOKIE_NAME, jwt, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      })
    );
    // console.log("User created");
    res.status(201);
    res.json({ message: "User created" });
    res.end();
  } else {
    res.status(402);
    res.end();
  }
}
