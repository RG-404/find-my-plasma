import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const myaccount = () => {
  const [data, setData] = useState([]);

  useEffect(async () => {
    const response = await axios.get(
      `https://fakerapi.it/api/v1/persons?_quantity=3&_seed=3`
    );
    const res_data = await response.data.data;
    setData(res_data);
  }, []);

  return (
    <div>
      <div className="py-14 bg-gradient-to-t from-white via-blue-300 to-blue-500">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-4xl my-6">My Account</div>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi ad
            quibusdam autem, voluptates fugiat odit officia aspernatur non
            aliquid, nostrum repudiandae voluptatem voluptas hic ratione optio
            incidunt deserunt ipsam quo.
          </p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-4xl my-6">Summary</div>
        <div>
          <span className="flex mb-2">
            <p className="font-bold md:w-1/6">Name:&nbsp;</p>
            <p className="text-gray-600">Rishparn Gogoi</p>
          </span>
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
      <div className="max-w-6xl mx-auto px-4 mt-10 mb-6">
        <div className="text-3xl mb-3">Status</div>
        <div className="mb-3">Looking for plasma</div>
        <div>
          <a className="cursor-pointer text-sm py-2 px-3 bg-black text-white rounded hover:bg-gray-700 transition duration-100">
            Update status
          </a>
        </div>
      </div>
    </div>
  );
};

export default myaccount;
