import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const index = () => {
  const router = useRouter();
  const { id } = router.query;

  const [listingNumber, setListingNumber] = useState(0);

  useEffect(async () => {
    if (!id) return;
    setListingNumber(parseInt(id));
  }, [id]);

  return (
    <div>
      <div className="py-14 bg-gradient-to-t from-white via-blue-300 to-blue-500">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-4xl my-6">Jane Doe</div>
          <span className="flex mb-2">
            <p className="font-bold md:w-1/6">Date of listing:&nbsp;</p>
            <p className="text-gray-600">19-19-19</p>
          </span>
          <span className="flex mb-2">
            <p className="font-bold md:w-1/6">Blood Group:&nbsp;</p>
            <p className="text-gray-600">A+</p>
          </span>
          <span className="flex mb-2">
            <p className="font-bold md:w-1/6">City:&nbsp;</p>
            <p className="text-gray-600">Jorhat</p>
          </span>
          <span className="flex mb-2">
            <p className="font-bold md:w-1/6">Area Pincode:&nbsp;</p>
            <p className="text-gray-600">785007</p>
          </span>
          <span className="flex mb-2">
            <p className="font-bold md:w-1/6">State:&nbsp;</p>
            <p className="text-gray-600">Assam</p>
          </span>
          <span className="flex mb-2">
            <p className="font-bold md:w-1/6">Phone Number:&nbsp;</p>
            <p className="text-gray-600">+91 88119 94019</p>
          </span>
          <span className="flex mb-2">
            <p className="font-bold md:w-1/6">In hospital:&nbsp;</p>
            <p className="text-gray-600">Yes</p>
          </span>
          <span className="flex mb-2">
            <p className="font-bold md:w-1/6">Hospital:&nbsp;</p>
            <p className="text-gray-600">ABC Hospital</p>
          </span>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4">
        <button className="md:mr-6 md:mb-0 mb-6 py-4 px-6 w-52 bg-yellow-400 rounded  font-bold hover:bg-yellow-300 transition duration-100 shadow-md">
          Offer Help {">>>>"}
        </button>
        <button className="py-4 px-6 w-52 bg-black rounded  font-bold hover:bg-gray-700 transition duration-100 text-white shadow-md">
          Share {">>>>"}
        </button>
      </div>
      <div className="my-12 max-w-6xl mx-auto px-4">
        <h1 className="text-2xl mb-5">Some question?</h1>
        <p className="border-l border-blue-500 pl-3 mb-8 text-gray-600 text-justify">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat
          eligendi veritatis nostrum voluptatem reprehenderit excepturi, quo
          illo natus ea maxime, cum facere impedit nulla pariatur obcaecati.
          Laborum beatae obcaecati nostrum.
        </p>
        <h1 className="text-2xl mb-5">Link some FAQ?</h1>
        <p className="border-l border-blue-500 pl-3 mb-8 text-gray-600 text-justify">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat
          eligendi veritatis nostrum voluptatem reprehenderit excepturi, quo
          illo natus ea maxime, cum facere impedit nulla pariatur obcaecati.
          Laborum beatae obcaecati nostrum.
        </p>
        <h1 className="text-2xl mb-5">Hello, answers?</h1>
        <p className="border-l border-blue-500 pl-3 mb-8 text-gray-600 text-justify">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat
          eligendi veritatis nostrum voluptatem reprehenderit excepturi, quo
          illo natus ea maxime, cum facere impedit nulla pariatur obcaecati.
          Laborum beatae obcaecati nostrum.
        </p>
      </div>
    </div>
  );
};

export default index;
