import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { comparePasswords, createJWT } from "@/lib/auth";
import { serialize } from "cookie";

export default async function loout(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.setHeader(
      "Set-Cookie",
      serialize(process.env.COOKIE_NAME, " ", {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      })
    );
    console.log("login");
    res.status(201);
    res.redirect("/signin");
    // res.json({ message: "Logged in" });
    res.end();
  } else {
    res.status(402);
    res.end();
  }
}
