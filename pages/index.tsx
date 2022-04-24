import { Category } from "@prisma/client";
import { withIronSessionSsr } from "iron-session/next";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SEMBRANDO_SENTIDO_COOKIE } from "../common/cookies";
import { getSessionProps } from "../common/serverSideProps";
import { getCategories } from "../repository/categories";
import { Profile } from "../types";
import CarList from "./_carList";

export const getServerSideProps = withIronSessionSsr(
  getSessionProps,
  SEMBRANDO_SENTIDO_COOKIE
);

interface HomeProps {
  user?: Profile;
}
const Home: NextPage<HomeProps> = () => {
  const router = useRouter();
  const { cat } = router.query;

  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState<number>(
    cat === undefined || cat === "0" ? 1 : Number(cat)
  );

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  return (
    <div>
      <Head>
        <title>Cars</title>
        <meta name="description" content="Cars" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mt-3">
        <div className="row">
          <div className="col-1">
            <div className="fs-3">Cars</div>
          </div>
          <div className="col-2">
            <select
              className="form-select form-select-sm mt-2"
              value={categoryId}
              aria-label="Default select example"
              onChange={(ev: any) => setCategoryId(ev.target.value)}
            >
              {categories.map((category, index) => (
                <option value={category.id} key={index}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
          <div className="col-9">
            <Link href="/car">
              <a className="btn btn-sm btn-outline-primary float-end mt-2">
                Create
              </a>
            </Link>
          </div>
        </div>
        <p className="fs-6 mt-2">
          List of cars of the{" "}
          {categories.find((c) => c.id === +categoryId)?.label} brand.
        </p>
        <CarList categoryId={categoryId} />
      </main>
    </div>
  );
};

export default Home;
