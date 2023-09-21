import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { comparePasswords, createJWT } from "@/lib/auth";
import { serialize } from "cookie";

export default async function signin(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const user = await db.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      res.status(401);
      res.json({ error: "Invalid login" });
      return;
    }
    console.log("req.password:", req.body.password);
    console.log("user password:", user.password);
    // if (req.body.password === user.password) {
    //   const jwt = await createJWT(user);
    //   res.setHeader(
    //     "Set-Cookie",
    //     serialize(process.env.COOKIE_NAME, jwt, {
    //       httpOnly: true,
    //       path: "/",
    //       maxAge: 60 * 60 * 24 * 7,
    //     })
    //   );
    //   console.log("login");
    //   res.status(201);
    //   res.json({ message: "Logged in" });
    // }
    const isUser = await comparePasswords(req.body.password, user.password);
    console.log("isUser:", isUser);

    if (isUser) {
      const jwt = await createJWT(user);
      res.setHeader(
        "Set-Cookie",
        serialize(process.env.COOKIE_NAME, jwt, {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        })
      );
      console.log("login");
      res.status(201);
      res.json({ message: "Logged in" });
    }
    // } else {
    else {
      res.status(400);
      res.json({ error: "Invalid login" });
    }
  } else {
    res.status(402);
    res.end();
  }
}
