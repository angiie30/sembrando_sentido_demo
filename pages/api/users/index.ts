// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient, User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import CryptoJS from "crypto-js";
import { RequestMethod } from "../../../enums";

const prisma = new PrismaClient();

export const usersRoute = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  switch (req.method) {
    case RequestMethod.GET: {
      res.json(await getUsers());
      break;
    }
    case RequestMethod.POST: {
      if (!req.body) {
        res.status(400).end("Opps! An error has occurred.");
        break;
      }

      res.json(await createUser(req.body));
      break;
    }
    default: {
      res.status(405).end("Method not allowed.");
      break;
    }
  }
};

export default usersRoute;

const getUsers = () => prisma.user.findMany();

const createUser = (record: User) => {
  var salt = (Math.random() + 1).toString(36).substring(7);
  var hash = encryptPassword(record.password, salt);

  return prisma.user.create({
    data: {
      name: record.name,
      username: record.username,
      password: hash,
      salt,
    },
  });
};

const encryptPassword = (password: string, salt: string) => {
  return CryptoJS.AES.encrypt(password, salt).toString();
};
