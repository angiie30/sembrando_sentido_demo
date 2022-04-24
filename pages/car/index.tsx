import { Car } from "@prisma/client";
import axios from "axios";
import Router from "next/router";
import type { NextPage } from "next";
import Head from "next/head";
import CarForm from "./_form";
import { useState } from "react";
import { FormValidation } from "../../types";
import { withIronSessionSsr } from "iron-session/next";
import { SEMBRANDO_SENTIDO_COOKIE } from "../../common/cookies";
import { getSessionProps } from "../../common/serverSideProps";

export const getServerSideProps = withIronSessionSsr(
  getSessionProps,
  SEMBRANDO_SENTIDO_COOKIE
);

const addCar = async (car: Car) => {
  const response = await axios.post<Car>(`/api/cars`, car);
  return response.data;
};

const AddCar: NextPage = () => {
  const [formValidation, setFormValidation] = useState<FormValidation>({
    isInvalid: false,
    message: "",
  });

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
      await addCar(record);
      Router.push(`/?cat=${record.categoryId}`);
    } catch {
      setFormValidation({
        isInvalid: true,
        message: "Oops! An error has occurred while submitting the data.",
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

      <CarForm formValidation={formValidation} submit={submitForm} />
    </div>
  );
};

export default AddCar;
