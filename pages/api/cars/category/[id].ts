// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Car, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export const carsByCategoryRoute = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  switch (req.method) {
    case "GET": {
      const categoryId = Number(req.query.id);
      res.json(await getCars(categoryId));
      break;
    }
    default: {
      res.status(405).end("Method not allowed.");
      break;
    }
  }
};

export default carsByCategoryRoute;

const getCars = async (categoryId: number) =>
  await prisma.car.findMany({ where: { categoryId: categoryId } });
