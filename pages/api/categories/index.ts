// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Category, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export const categoriesRoute = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  switch (req.method) {
    case "GET": {
      res.json(await getCategories());
      break;
    }
    case "POST": {
      if (!req.body) {
        res.status(400).end("Opps! An error has occurred.");
        break;
      }

      res.json(await createCategory(req.body));
      break;
    }
    default: {
      res.status(405).end("Method not allowed.");
      break;
    }
  }
};

export default categoriesRoute;

const getCategories = () => prisma.category.findMany();

const createCategory = (record: Category) =>
  prisma.category.create({
    data: { label: record.label, active: record.active },
  });
