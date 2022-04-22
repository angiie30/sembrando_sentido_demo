export const SEMBRANDO_SENTIDO_COOKIE = {
  cookieName: process.env.COOKIE_NAME || "",
  password: process.env.PASSWORD || "",
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
