import { Car } from "@prisma/client";
import type { NextPage } from "next";
import { useState } from "react";
import { withIronSessionSsr } from "iron-session/next";
import Head from "next/head";
import { useRouter } from "next/router";
import Router from "next/router";
import CarForm from "./_form";
import { FormValidation, Profile } from "../../types";
import { deleteCar, updateCar } from "../../repository/cars";
import { SEMBRANDO_SENTIDO_COOKIE } from "../../common/cookies";
import { getAndValidateSessionProps } from "../../common/serverSideProps";

export const getServerSideProps = withIronSessionSsr(
  getAndValidateSessionProps,
  SEMBRANDO_SENTIDO_COOKIE
);

const AddCar: NextPage = () => {
  const router = useRouter();
  const [formValidation, setFormValidation] = useState<FormValidation>({
    isInvalid: false,
    message: "",
  });

  const { id } = router.query;

  const submitForm = async (record: Car) => {
    setFormValidation({ isInvalid: false, message: "" });

    if (
      !record.title ||
      record.categoryId === 0 ||
      record.active === undefined
    ) {
      setFormValidation({ isInvalid: true, message: "" });
      return;
    }

    try {
      await updateCar(record);
      Router.push(`/?cat=${record.categoryId}`);
    } catch {
      setFormValidation({
        isInvalid: true,
        message: "Oops! An error has occurred while submitting the data.",
      });
    }
  };

  const remove = async (record: Car) => {
    try {
      await deleteCar(record.id);
      Router.push(`/?cat=${record.categoryId}`);
    } catch {
      setFormValidation({
        isInvalid: true,
        message: "Oops! An error has occurred while trying to delete the cart.",
      });
    }
  };

  return (
    <div>
      <Head>
        <title>Car</title>
        <meta name="description" content="Cars" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CarForm
        id={Number(id)}
        formValidation={formValidation}
        submit={submitForm}
        remove={remove}
      />
    </div>
  );
};

export default AddCar;
