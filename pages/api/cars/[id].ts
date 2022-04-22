// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Car, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { SEMBRANDO_SENTIDO_COOKIE } from "../../../common/cookies";

const prisma = new PrismaClient();

const carRoute = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  switch (req.method) {
    case "GET": {
      const id = Number(req.query.id);
      res.json(await getCar(id));
      break;
    }
    case "PUT": {
      const { user } = req.session as any;

      if (!user || !req.body) {
        res.status(400).end("Opps! An error has occurred.");
        break;
      }

      const id = Number(req.query.id);
      res.json(await updateCar(req.body, id));
      break;
    }
    case "DELETE": {
      const id = Number(req.query.id);

      const { user } = req.session as any;

      if (!user || !id) {
        res.status(400).end("Opps! An error has occurred.");
        break;
      }

      res.json(await deleteCar(id));
      break;
    }
    default: {
      res.status(405).end("Method not allowed.");
      break;
    }
  }
};

const getCar = async (id: number) =>
  await prisma.car.findUnique({
    where: {
      id: id,
    },
  });

const updateCar = async (record: Car, recordId: number) =>
  await prisma.car.update({
    data: { ...record, id: recordId },
    where: { id: record.id },
  });

const deleteCar = async (id: number) =>
  await prisma.car.delete({ where: { id: id } });

export default withIronSessionApiRoute(carRoute, SEMBRANDO_SENTIDO_COOKIE);
