import type { NextPage } from "next";
import Head from "next/head";
import Router from "next/router";
import { useState } from "react";
import clsx from "clsx";
import { FormValidation, Login, Profile } from "../types";
import { auth } from "../repository/user";
import { SEMBRANDO_SENTIDO_COOKIE } from "../common/cookies";
import { withIronSessionSsr } from "iron-session/next";
import { getSessionProps } from "../common/serverSideProps";

export const getServerSideProps = withIronSessionSsr(
  getSessionProps,
  SEMBRANDO_SENTIDO_COOKIE
);

const LoginPage: NextPage = () => {
  const [user, setUser] = useState<Login>({ username: "", password: "" });
  const [formValidation, setFormValidation] = useState<FormValidation>({
    isInvalid: false,
    message: "",
  });

  const submit = async () => {
    setFormValidation({ isInvalid: false, message: "" });

    if (user.username === "" || user.password === "") {
      setFormValidation({ isInvalid: true, message: "" });

      return;
    }

    try {
      await auth(user);

      Router.push(`/`);
    } catch {
      setFormValidation({
        isInvalid: true,
        message:
          "Sorry, your username or password was incorrect. Please double-check your password.",
      });
    }
  };

  return (
    <div>
      <Head>
        <title>Login</title>
        <meta name="description" content="Cars" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mt-3">
        <div className="row justify-content-center mt-5">
          <div className="col-6">
            <div className="card">
              <div className="card-header">Login</div>
              <div className="card-body">
                <form
                  className={clsx({
                    "was-validated":
                      formValidation.isInvalid &&
                      (!user.username || !user.password),
                  })}
                >
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      value={user?.username}
                      onChange={(ev: any) =>
                        setUser({ ...user, username: ev.target.value })
                      }
                      id="floatingInput"
                      placeholder="Username"
                      required
                    />
                    <label htmlFor="floatingInput">Username</label>
                    <div className="invalid-feedback">Username is required</div>
                  </div>
                  <div className="form-floating">
                    <input
                      type="password"
                      value={user?.password}
                      onChange={(ev: any) =>
                        setUser({ ...user, password: ev.target.value })
                      }
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      required
                    />
                    <label htmlFor="floatingPassword">Password</label>
                    <div className="invalid-feedback">Password is required</div>
                  </div>
                </form>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <a href="#" className="card-link">
                      Forgot Password
                    </a>
                    <button
                      onClick={() => submit()}
                      className="card-link btn btn-primary float-end"
                    >
                      Log In
                    </button>
                  </div>
                </div>
                <p
                  className={clsx("text-danger mt-5 text-center", {
                    "d-none": !formValidation.isInvalid,
                  })}
                >
                  {formValidation.message}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
