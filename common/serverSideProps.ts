import { GetServerSidePropsContext } from "next";

export const getAndValidateSessionProps = (
  context: GetServerSidePropsContext
) => {
  const { user } = context.req.session as any;

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { user },
  };
};

export const getSessionProps = (context: GetServerSidePropsContext) => {
  const { user } = context.req.session as any;

  return {
    props: { user: user ?? null },
  };
};
