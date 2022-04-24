// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Car, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export const carsByCategoryRoute = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  if (req.method !== "GET") {
    res.status(405).end("Method not allowed.");
    return;
  }

  const categoryId = Number(req.query.id);
  res.json(await getCars(categoryId));
};

export default carsByCategoryRoute;

const getCars = async (categoryId: number) =>
  await prisma.car.findMany({ where: { categoryId: categoryId } });
