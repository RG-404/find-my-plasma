import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const index = () => {
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState({
    address: {
      city: null,
      state: null,
      locality: null,
      pin: null,
    },
    email: null,
    hospital: null,
    _id: null,
    name: null,
    phone: null,
    age: null,
    phoneAlt: null,
    bloodGroup: null,
    bloodGroupNeeded: [null],
    isInHospital: null,
    identifier: null,
    createdAt: null,
  });

  useEffect(async () => {
    if (!id) return;
    const res = await axios.get(`/api/plasmarequired?id=${id}`);
    setData(res.data.data);
  }, [id]);

  return (
    <div>
      <div className="py-14 bg-gradient-to-t from-white via-blue-300 to-blue-500">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-4xl my-6">{data.name}</div>
          <span className="flex mb-2">
            <p className="font-bold md:w-1/4">Date of listing:&nbsp;</p>
            <p className="text-gray-600">{data.createdAt}</p>
          </span>
          <span className="flex mb-2">
            <p className="font-bold md:w-1/4">Blood Group:&nbsp;</p>
            <p className="text-gray-600">{data.bloodGroup}</p>
          </span>
          <span className="flex mb-2">
            <p className="font-bold md:w-1/4">Accepted Blood Group(s):&nbsp;</p>
            <p className="text-gray-600">{data.bloodGroupNeeded.join(", ")}</p>
          </span>
          <span className="flex mb-2">
            <p className="font-bold md:w-1/4">City:&nbsp;</p>
            <p className="text-gray-600">{data.address.city}</p>
          </span>
          <span className="flex mb-2">
            <p className="font-bold md:w-1/4">Area Pincode:&nbsp;</p>
            <p className="text-gray-600">{data.address.pin}</p>
          </span>
          <span className="flex mb-2">
            <p className="font-bold md:w-1/4">State:&nbsp;</p>
            <p className="text-gray-600">{data.address.state}</p>
          </span>
          <span className="flex mb-2">
            <p className="font-bold md:w-1/4">Phone Number:&nbsp;</p>
            <p className="text-gray-600">+91 {data.phone}</p>
          </span>
          <span className="flex mb-2">
            <p className="font-bold md:w-1/4">Phone Number (alt):&nbsp;</p>
            <p className="text-gray-600">
              {data.phoneAlt ? `+91 ${data.phoneAlt}` : "N/A"}
            </p>
          </span>
          <span className="flex mb-2">
            <p className="font-bold md:w-1/4">In hospital:&nbsp;</p>
            <p className="text-gray-600">{data.isInHospital ? "Yes" : "No"}</p>
          </span>
          <span className="flex mb-2">
            <p className="font-bold md:w-1/4">Hospital:&nbsp;</p>
            <p className="text-gray-600">
              {data.hospital ? data.hospital : "N/A"}
            </p>
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
        {[
          "It is a great thing that you wish to help people in this difficult time.",
          "You can contact the patient through the above given contact information.",
          "However, we expect you not to share or use these information for any other purpose.",
        ].map((item) => (
          <p className="border-l border-blue-500 pl-3 mb-8 text-gray-600 text-justify">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};

export default index;
