import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from "next";
import { SEMBRANDO_SENTIDO_COOKIE } from "../../../common/cookies";

const logoutRoute = (req: NextApiRequest, res: NextApiResponse<any>) => {
  req.session.destroy();
  res.send("Logout was successful.");
};

export default withIronSessionApiRoute(logoutRoute, SEMBRANDO_SENTIDO_COOKIE);
