import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Pagination from "../../../components/Pagination";

const listing = () => {
  const router = useRouter();
  const { id } = router.query;

  const [currentIndex, setCurrentIndex] = useState(-1);
  const [data, setData] = useState([]);

  useEffect(async () => {
    if (!id) return;
    setCurrentIndex(id);
    const response = await axios.get(
      `https://fakerapi.it/api/v1/persons?_quantity=100&_seed=${id}`
    );
    const res_data = await response.data.data;
    setData(res_data);
  }, [id]);

  return (
    <div>
      <div className="py-14 text-center bg-gradient-to-t from-white via-blue-300 to-blue-500">
        <div className="text-3xl my-6">Show listing for</div>
        <input
          className="border border-blue-700 rounded w-96 h-10 px-5"
          placeholder="enter your city"
        ></input>
      </div>
      <div className="mt-14 max-w-6xl mx-auto px-4 flex justify-end">
        {
          currentIndex != -1 ? <Pagination current={currentIndex} max={10} /> : null
        }
        
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
                <div
                  className={`py-4 px-3 w-1/4 border border-black ${
                    index % 2 == 0 ? "bg-gray-800" : "bg-gray-700"
                  } text-white hover:bg-yellow-400 hover:text-yellow-900 transition duration-200 cursor-pointer`}
                >
                  {`${listing.firstname} ${listing.lastname}`}
                </div>
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
    </div>
  );
};

export default listing;
