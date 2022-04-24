// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Car, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { RequestMethod } from "../../../enums";

const prisma = new PrismaClient();

export const carsRoute = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  switch (req.method) {
    case RequestMethod.GET: {
      res.json(await getCars());
      break;
    }
    case RequestMethod.POST: {
      if (!req.body) {
        res.status(400).end("Opps! An error has occurred.");
        break;
      }

      res.json(await createCar(req.body));
      break;
    }
    default: {
      res.status(405).end("Method not allowed.");
      break;
    }
  }
};

export default carsRoute;

const getCars = async () => await prisma.car.findMany();

const createCar = async (record: Car) =>
  await prisma.car.create({
    data: {
      title: record.title,
      description: record.description,
      categoryId: record.categoryId,
      active: record.active,
    },
  });
