import "../styles/globals.css";
import Layout from "../components/Layout";
import { Fragment, useEffect } from "react";
import Head from "next/head";
import initFirebase from "../utils/firebase";
import firebase from "firebase/app";
import "firebase/analytics";
import { useRouter } from "next/router";

initFirebase();

function MyApp({ Component, pageProps }) {
  const routers = useRouter();

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      firebase.analytics();

      const logEvent = (url) => {
        firebase.analytics().setCurrentScreen(url);
        firebase.analytics().logEvent("screen_view");
      };

      routers.events.on("routeChangeComplete", logEvent);
      //For First Page
      logEvent(window.location.pathname);

      //Remvove Event Listener after un-mount
      return () => {
        routers.events.off("routeChangeComplete", logEvent);
      };
    }
  }, []);

  return (
    <Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#2d89ef" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Fragment>
  );
}

export default MyApp;
