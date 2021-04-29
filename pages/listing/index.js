import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import Pagination from "../../components/Pagination";
import { route } from "next/dist/next-server/server/router";

const MAX_ITEM_PER_PAGE = 50;

const listing = () => {
  const router = useRouter();
  const { page } = router.query;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState(-1);
  const [loadindData, setLoadindData] = useState(false);

  useEffect(async () => {
    setLoadindData(true);
    if (router.query.page === undefined) router.push("/listing?page=1");
    if (!page) return;
    setCurrentIndex(parseInt(page));
    const plasma_req_count_res = await axios.get(`/api/plasmarequired/count`);
    const plasma_req_count = plasma_req_count_res.data.count;
    setTotalPage(Math.ceil(plasma_req_count / MAX_ITEM_PER_PAGE));
    const response = await axios.get(
      `/api/plasmarequired?skip=${
        (parseInt(page) - 1) * MAX_ITEM_PER_PAGE
      }&limit=${MAX_ITEM_PER_PAGE}`
    );
    const res_data = await response.data.data;
    setData(res_data);
    setLoadindData(false);
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
          <div>
            <input
              className="border border-blue-700 rounded md:w-96 h-10 px-5 mt-8"
              placeholder="enter your city"
            />
            <button>Search</button>
          </div>
        </div>
      </div>
      <div className="mt-14 max-w-6xl mx-auto px-4 flex justify-start">
        {totalPage > 1 ? (
          <div className="md:flex items-center">
            <div className="text-xs text-gray-400 md:mr-3">page</div>
            <Pagination current={currentIndex} max={totalPage} />
          </div>
        ) : null}
      </div>
      <div className="mt-14 max-w-6xl mx-auto px-4 flex justify-between text-white">
        <div className="bg-black py-4 px-3 w-1/5 border border-white">Name</div>
        <div className="bg-black py-4 px-3 w-1/5 border border-white">Date</div>
        <div className="bg-black py-4 px-3 w-1/5 border border-white">City</div>
        <div className="bg-black py-4 px-3 w-1/5 border border-white">
          Blood Group Needed
        </div>
        <div className="bg-black py-4 px-3 w-1/5 border border-white">Age</div>
      </div>
      {loadindData ? (
        <div className=" max-w-6xl mx-auto px-4 flex justify-between">
          <div className="bg-black py-4 px-3 w-full text-white">Loading...</div>
        </div>
      ) : data.length > 0 ? (
        data.map((listing, index) => {
          return (
            <div
              className=" max-w-6xl mx-auto px-4 flex justify-between"
              key={index}
            >
              <Link href={`/listing/profile/${listing.identifier}`}>
                <div
                  className={`py-4 px-3 w-1/5 border border-black ${
                    index % 2 == 0 ? "bg-gray-800" : "bg-gray-700"
                  } text-white hover:bg-yellow-400 hover:text-yellow-900 transition duration-200 cursor-pointer`}
                >
                  {`${listing.name}`}
                </div>
              </Link>
              <div className="py-4 px-3 w-1/5 border border-black">
                {listing.createdAt}
              </div>
              <div className="py-4 px-3 w-1/5 border border-black">
                {listing.address.city}
              </div>
              <div className="py-4 px-3 w-1/5 border border-black">
                {listing.bloodGroupNeeded.join(", ")}
              </div>
              <div className="py-4 px-3 w-1/5 border border-black">
                {listing.age}
              </div>
            </div>
          );
        })
      ) : data.length === 0 ? (
        <div className=" max-w-6xl mx-auto px-4 flex justify-between">
          <div className="bg-black py-4 px-3 w-full text-white">
            Not enough data
          </div>
        </div>
      ) : null}
      <div className="mt-14 mb-14 max-w-6xl mx-auto px-4 flex justify-start">
        {totalPage > 1 ? (
          <div className="md:flex items-center">
            <div className="text-xs text-gray-400 md:mr-3">page</div>
            <Pagination current={currentIndex} max={totalPage} />
          </div>
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
