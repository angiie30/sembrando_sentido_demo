// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Category, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export const categoryRoute = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const id = Number(req.query.id);

  if (!id) {
    res.status(400).end("Opps! An error has occurred.");
    return;
  }

  switch (req.method) {
    case "GET": {
      res.json(await getCategory(id));
      break;
    }
    case "DELETE": {
      res.json(await deleteCategory(id));
      break;
    }
    default: {
      res.status(405).end("Method not allowed.");
      break;
    }
  }
};

export default categoryRoute;

const getCategory = async (id: number) =>
  await prisma.category.findUnique({
    where: {
      id: id,
    },
  });

const deleteCategory = async (id: number) =>
  await prisma.category.delete({ where: { id: id } });
