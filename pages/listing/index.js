import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import Pagination from "../../components/Pagination";

const MAX_ITEM_PER_PAGE = 2;

const listing = () => {
  const router = useRouter();
  let { page, search, query } = router.query;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState(-1);
  const [loadindData, setLoadindData] = useState(false);
  const [searchBy, setSearchBy] = useState("city");
  const [searchQuery, setSearchQuery] = useState("");

  const [pageinationLinks, setPageinationLinks] = useState({
    front: "",
    back: "",
    format: "",
  });

  useEffect(async () => {
    if (router.isReady) {
      if (search) setSearchBy(search);
      if (query) setSearchQuery(query);
      if (page === undefined) page = 1;
      if (!page) return;
      setLoadindData(true);
      console.log({ page, search, query });
      setCurrentIndex(parseInt(page));

      const get_count_path =
        search === undefined
          ? `/api/plasmarequired/count`
          : `/api/plasmarequired/search?${search}=${query}`;
      console.log(get_count_path);
      const plasma_req_count_res = await axios.get(get_count_path);
      const plasma_req_count = plasma_req_count_res.data.count;
      setTotalPage(Math.ceil(plasma_req_count / MAX_ITEM_PER_PAGE));
      const get_data_path = `/api/plasmarequired${
        search ? `/search?${search}=${query}&` : "?"
      }skip=${
        (parseInt(page) - 1) * MAX_ITEM_PER_PAGE
      }&limit=${MAX_ITEM_PER_PAGE}`;
      console.log(get_data_path);
      const response = await axios.get(get_data_path);
      const res_data = await response.data.data;
      setData(res_data);
      setLoadindData(false);
    }
  }, [router.query]);

  useEffect(() => {
    if (router.isReady) {
      if (query) {
        console.log("SEARCH MODE ON");
        setPageinationLinks({
          front: `/listing?${
            searchBy ? `search=${searchBy}&query=${searchQuery}&` : null
          }page=${currentIndex + 1}`,
          back: `/listing?${
            searchBy ? `search=${searchBy}&query=${searchQuery}&` : null
          }page=${currentIndex - 1}`,
          format: `/listing?${
            searchBy ? `search=${searchBy}&query=${searchQuery}&` : null
          }page=`,
        });
      } else {
        console.log("SEARCH MODE OFF");
        setPageinationLinks({
          front: `/listing?page=${currentIndex + 1}`,
          back: `/listing?page=${currentIndex - 1}`,
          format: `/listing?page=`,
        });
      }
    }
  }, [currentIndex]);

  const handleInput = (event, setState) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setState(value);
  };

  return (
    <div>
      <div className="py-14 bg-gradient-to-t from-white via-blue-300 to-blue-500">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-4xl my-6">Plasma Request Listings</div>
          <p className="text-gray-600">
            Thank you for taking interest in donating plasma and offering a hand
            of help. Here are the list of patients that needs your help.
          </p>
          {/* Search Section */}
          <div>
            <input
              value={searchQuery}
              onChange={(e) => {
                handleInput(e, setSearchQuery);
              }}
              className="border border-blue-700 rounded md:w-96 h-10 px-5 mt-8 md:mr-4"
              placeholder=""
            />
            <select
              className="border border-blue-600 px-3 py-2 rounded max-w-6xl bg-black text-white md:mr-4"
              name="blood-group"
              value={searchBy}
              onChange={(e) => {
                handleInput(e, setSearchBy);
              }}
            >
              <option value="city" defaultValue>
                City
              </option>
              <option value="state">State</option>
              <option value="locality">Locality</option>
              <option value="pincode">Pincode</option>
            </select>
            <Link
              scroll={false}
              href={`/listing?search=${searchBy}&query=${searchQuery}&page=1`}
            >
              <button className="h-10 px-5 bg-black text-white rounded hover:bg-gray-700 transition duration-100">
                Search
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-14 max-w-6xl mx-auto px-4 flex justify-start">
        {totalPage > 1 ? (
          <div className="md:flex items-center">
            <div className="text-xs text-gray-400 md:mr-3">page</div>
            <Pagination
              current={currentIndex}
              max={totalPage}
              links={pageinationLinks.format}
              linkFront={pageinationLinks.front}
              linkBack={pageinationLinks.back}
            />
          </div>
        ) : null}
      </div>
      <div className="overflow-x-scroll md:overflow-x-hidden">
        <div className="w-palsma-table md:w-auto">
          <div className="mt-14 max-w-6xl mx-auto px-4 flex justify-between text-white">
            <div className="bg-black py-4 px-3 w-1/5 border border-white">
              Name
            </div>
            <div className="bg-black py-4 px-3 w-1/5 border border-white">
              Date
            </div>
            <div className="bg-black py-4 px-3 w-1/5 border border-white">
              City
            </div>
            <div className="bg-black py-4 px-3 w-1/5 border border-white">
              Blood Group Needed
            </div>
            <div className="bg-black py-4 px-3 w-1/5 border border-white">
              Age
            </div>
          </div>
          {loadindData ? (
            <div className=" max-w-6xl mx-auto px-4 flex justify-between">
              <div className="bg-black py-4 px-3 w-full text-white">
                Loading...
              </div>
            </div>
          ) : data.length > 0 ? (
            data.map((listing, index) => {
              return (
                <div
                  className=" max-w-6xl mx-auto px-4 flex justify-between"
                  key={index}
                >
                  <Link href={`/listing/u/${listing.identifier}`}>
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
        </div>
      </div>

      <div className="mt-14 mb-14 max-w-6xl mx-auto px-4 flex justify-start">
        {totalPage > 1 ? (
          <div className="md:flex items-center">
            <div className="text-xs text-gray-400 md:mr-3">page</div>
            <Pagination
              current={currentIndex}
              max={totalPage}
              links={pageinationLinks.format}
              linkFront={pageinationLinks.front}
              linkBack={pageinationLinks.back}
            />
          </div>
        ) : null}
      </div>
      <div className="my-12 text-gray-600 max-w-6xl mx-auto px-4">
        <p className="text-xl mb-8">Conditions for donors:</p>
        {[
          "You can donate only after 14 days of a Covid-19 positive report, \
          if asymptomatic and 14 days after the symptoms have disappeared, if \
          symptomatic.",
          "If you took COVID-19 vaccine, you cannot donate until 28 days have passed.",
          "Women who have ever been pregnant cannot donate plasma.",
          "You are not eligible to donate if you have a lack of antibodies in your blood.",
        ].map((item, index) => (
          <p className="border-l border-blue-500 pl-3 mb-10">{item}</p>
        ))}
      </div>
    </div>
  );
};

export default listing;
