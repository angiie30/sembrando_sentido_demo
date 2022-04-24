import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import NavBar from "./_navbar";
import { useEffect } from "react";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { user }: any = { ...pageProps };

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.js" as any);
  }, []);

  return (
    <>
      <NavBar user={user} />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
