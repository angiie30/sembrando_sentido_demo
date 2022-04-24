// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Category, PrismaClient, User } from "@prisma/client";
import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from "next";
import CryptoJS from "crypto-js";
import { Login, Profile } from "../../../types";
import { SEMBRANDO_SENTIDO_COOKIE } from "../../../common/cookies";

const prisma = new PrismaClient();

const loginRoute = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (req.method !== "POST") {
    res.status(405).end("Method not allowed.");
    return;
  }

  if (!req.body) {
    res.status(400).end("Opps! An error has occurred.");
    return;
  }

  const data: Login = { ...req.body };
  const user = await getUserByUsername(data.username);

  if (!user) {
    res.status(404).end("User not found.");
    return;
  }

  const userPassowrd = decryptPassowrd(user.password, user.salt);

  if (userPassowrd !== data.password) {
    res.status(400).end("Username or password is incorrect.");
    return;
  }

  const userInfo: Profile = {
    id: user.id,
    name: user.name,
    username: user.username,
  };
  (req.session as any).user = userInfo;

  await req.session.save();

  res.json(userInfo);
};

export default withIronSessionApiRoute(loginRoute, SEMBRANDO_SENTIDO_COOKIE);

const getUserByUsername = (username: string) =>
  prisma.user.findUnique({ where: { username } });

const decryptPassowrd = (hash: string, salt: string) => {
  var bytes = CryptoJS.AES.decrypt(hash, salt);
  return bytes.toString(CryptoJS.enc.Utf8);
};
