import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { comparePasswords, createJWT } from "@/lib/auth";
import { serialize } from "cookie";

const cookieName: string = process.env.COOKIE_NAME;

export default async function loout(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.setHeader(
      "Set-Cookie",
      serialize(cookieName, " ", {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      })
    );
    console.log("logged out");
    res.status(200);
    res.redirect("/signin");
    // res.json({ message: "Logged in" });
    res.end();
  } else {
    res.status(401);
    res.end();
  }
}
