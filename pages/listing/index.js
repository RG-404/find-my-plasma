import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import Pagination from "../../components/Pagination";
import { route } from "next/dist/next-server/server/router";

const listing = () => {
  const router = useRouter();
  const { page } = router.query;

  const [currentIndex, setCurrentIndex] = useState(-1);
  const [data, setData] = useState([]);

  useEffect(async () => {
    if (router.query.page === undefined) router.push("/listing?page=1");
    if (!page) return;
    setCurrentIndex(parseInt(page));
    const response = await axios.get(
      `https://fakerapi.it/api/v1/persons?_quantity=100&_seed=${page}`
    );
    const res_data = await response.data.data;
    setData(res_data);
  }, [page]);

  return (
    <div>
      <div className="py-14 bg-gradient-to-t from-white via-blue-300 to-blue-500">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-4xl my-6">Plasma Request Listings</div>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi ad
            quibusdam autem, voluptates fugiat odit officia aspernatur non
            aliquid, nostrum repudiandae voluptatem voluptas hic ratione optio
            incidunt deserunt ipsam quo.
          </p>
          <input
            className="border border-blue-700 rounded w-96 h-10 px-5 mt-8"
            placeholder="enter your city"
          ></input>
        </div>
      </div>
      <div className="mt-14 max-w-6xl mx-auto px-4 flex justify-start">
        {currentIndex != -1 ? (
          <Pagination current={currentIndex} max={10} />
        ) : null}
      </div>
      <div className="mt-14 max-w-6xl mx-auto px-4 flex justify-between text-white">
        <div className="bg-black py-4 px-3 w-1/4 border border-white">Name</div>
        <div className="bg-black py-4 px-3 w-1/4 border border-white">Date</div>
        <div className="bg-black py-4 px-3 w-1/4 border border-white">City</div>
        <div className="bg-black py-4 px-3 w-1/4 border border-white">
          Blood
        </div>
      </div>
      {data.length > 0
        ? data.map((listing, index) => {
            return (
              <div
                className=" max-w-6xl mx-auto px-4 flex justify-between"
                key={index}
              >
                <Link
                  href={`/listing/profile/${listing.firstname}${listing.lastname}`}
                >
                  <div
                    className={`py-4 px-3 w-1/4 border border-black ${
                      index % 2 == 0 ? "bg-gray-800" : "bg-gray-700"
                    } text-white hover:bg-yellow-400 hover:text-yellow-900 transition duration-200 cursor-pointer`}
                  >
                    {`${listing.firstname} ${listing.lastname}`}
                  </div>
                </Link>
                <div className="py-4 px-3 w-1/4 border border-black">
                  {listing.birthday}
                </div>
                <div className="py-4 px-3 w-1/4 border border-black">
                  {listing.address.city}
                </div>
                <div className="py-4 px-3 w-1/4 border border-black">
                  {listing.gender}
                </div>
              </div>
            );
          })
        : null}
      <div className="mt-14 mb-14 max-w-6xl mx-auto px-4 flex justify-start">
        {currentIndex != -1 ? (
          <Pagination current={currentIndex} max={10} />
        ) : null}
      </div>
      <div className="my-12 text-gray-600 max-w-6xl mx-auto px-4">
        <p className="border-l border-blue-500 pl-3">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat
          eligendi veritatis nostrum voluptatem reprehenderit excepturi, quo
          illo natus ea maxime, cum facere impedit nulla pariatur obcaecati.
          Laborum beatae obcaecati nostrum.
        </p>
        <p className="border-l border-blue-500 pl-3 mt-8">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat
          eligendi veritatis nostrum voluptatem reprehenderit excepturi, quo
          illo natus ea maxime, cum facere impedit nulla pariatur obcaecati.
          Laborum beatae obcaecati nostrum.
        </p>
        <p className="border-l border-blue-500 pl-3 mt-8">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat
          eligendi veritatis nostrum voluptatem reprehenderit excepturi, quo
          illo natus ea maxime, cum facere impedit nulla pariatur obcaecati.
          Laborum beatae obcaecati nostrum.
        </p>
      </div>
    </div>
  );
};

export default listing;
