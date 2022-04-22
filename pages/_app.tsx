import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import NavBar from "./_navbar";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { user }: any = { ...pageProps };

  return (
    <>
      <NavBar user={user} />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
