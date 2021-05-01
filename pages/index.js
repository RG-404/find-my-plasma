import { Fragment } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>Home</title>
      </Head>
      <div className="mt-20 max-w-6xl mx-auto md:px-4 px-7">
        <div className="flex">
          <div className="md:w-1/2">
            <Link href="/listing">
              <div className="mb-12 ">
                <p className="mb-2 font-bold">View plasma request list</p>
                <p className="mb-2">For Donors</p>
                <p className=" text-blue-600">
                  <a>
                    <u>Donate Plasma</u> {">>>"}
                  </a>
                </p>
              </div>
            </Link>
            <Link href="/plasmarequest">
              <div className="mb-20">
                <p className="mb-2 font-bold">Fill up plasma request form</p>
                <p className="mb-2">For Patients</p>
                <p className="text-blue-600">
                  <a href="#">
                    <u>Make request for plasma</u> {">>>"}
                  </a>
                </p>
              </div>
            </Link>

            {[
              "The situation of the nation has gotten more severe during these past few weeks. \
          Amidst this crisis, many people are coming forward to offer a helping hand towards the needs of the hour.",
              "This site focuses on helping the COVID-19 patients who are in need of plasma with the people who wish to and capable of donating it.",
              "If you have recovered from COVID-19, you can help others recover too and save lives by donating your plasma.",
            ].map((item, index) => (
              <p className="mb-4 leading-8" key={`home_list_1_${index}`}>
                {item}
              </p>
            ))}
            <div className="mb-12 mt-12">
              <p className="mb-2 font-bold">COVID-19 Map</p>
              <p className="mb-2">By Google News</p>
              <p className=" text-blue-600">
                <a
                  target="_blank"
                  href="https://news.google.com/covid19/map?hl=en-IN&gl=IN&ceid=IN%3Aen&mid=%2Fm%2F03rk0"
                  rel="noopener noreferrer"
                >
                  <u>Link</u> {">>>"}
                </a>
              </p>
            </div>
          </div>
          <div className="md:w-1/2 md:block hidden">
            <div className="pl-20">
              <Image
                height={800}
                width={640}
                src="https://source.unsplash.com/lyiKExA4zQA/640X800"
                alt="Helping hands"
              />
            </div>
          </div>
        </div>
        <p className="text-xl font-bold mb-4">
          What is Convalescent plasma therapy?
        </p>
        <p className="border-l border-blue-500 pl-3 mb-10 leading-8">
          “Convalescent plasma therapy” is a treatment process where the blood
          of a person who has recovered from the infection is injected into a
          patient suffering from that disease. The plasma is the yellowish
          liquid part of the blood which contains antibodies that enables the
          body to fight against the pathogens and help people recover from the
          disease.
        </p>
      </div>
    </Fragment>
  );
}
