import Head from "next/head";
import { Fragment } from "react";

const howitworks = () => {
  return (
    <Fragment>
      <Head>
        <title>How it works</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="description" content="About the website" />
      </Head>
      <div className="mt-12 max-w-6xl mx-auto md:px-4 px-7">
        {[
          "The rising of covid cases left a lot of people in need of plasma. Due to \
        this, many are using the help of social media to ask for aid. However, \
        these request are scattered all over media in an unorganized manner. We \
        created this platform which works solely for the purpose of listing \
        patients who are in immediate need so that the donor can find and help \
        them.",
        ].map((item, index) => (
          <p className="mb-4 leading-8 " key={`htw_list_1_${index}`}>
            {item}
          </p>
        ))}
        <p className="text-xl font-bold mb-6 mt-10">Aim of this website</p>
        {[
          "To let the patients put up a request and state their need in \
        order for them to be found by a suitable donor for them.",
          "To let plasma donors, find patients suffering from COVID-19 \
        and are in immediate need of plasma.",
          "To enable other organizations with similar interest, find and \
        reach out to the patients for help.",
        ].map((item) => (
          <p className="mb-6">-&emsp;{item}</p>
        ))}
        <p className="text-xl font-bold mb-6 mt-10">
          Instruction for patients:
        </p>
        {[
          'Click the "make request for plasma" option in the home page or \
        "Make Request" option located in the top right corner.',
          "We will need some details about you such as your phone number, \
        blood group and your address.",
          "An OTP will be sent to your given phone number. Enter it and you will \
        be registered.",
          "You will be listed in our plasma listing table. Once a suitable donor \
        finds you, they can contact you as per the information you provided earlier.",
        ].map((item) => (
          <p className="mb-6">-&emsp;{item}</p>
        ))}
      </div>
    </Fragment>
  );
};

export default howitworks;
