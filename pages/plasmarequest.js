import { useEffect, useState } from "react";
import Firebase from "../components/Firebase";

const plasmarequest = () => {
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [showPhoneVerificationBlock, setShowPhoneVerificationBlock] = useState(
    false
  );

  const changeHandlerCheck1 = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setCheck1(value);
  };

  const changeHandlerCheck2 = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setCheck2(value);
  };

  const handleSubmit = async () => {
    setShowPhoneVerificationBlock(true);
    console.log("CLICK");
    const recaptcha = new Firebase.auth.RecaptchaVerifier("recaptcha");
    const number = "+918811994019";
    try {
      console.log(recaptcha);
      const response = await Firebase.auth().signInWithPhoneNumber(
        number,
        recaptcha
      );
      const code = prompt("OTP");
      const result = await response.confirm(code);
      console.log(result.user.phoneNumber);
    } catch (error) {
      console.log("NONONONONO");
      console.log(error);
    }
  };

  const handleSubmit_DEV = async () => {
    console.log("CLICK");
  };

  return (
    <div>
      <div className="py-14 bg-gradient-to-t from-white via-blue-300 to-blue-500">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-4xl my-6">Register as patient</div>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi ad
            quibusdam autem, voluptates fugiat odit officia aspernatur non
            aliquid, nostrum repudiandae voluptatem voluptas hic ratione optio
            incidunt deserunt ipsam quo.
          </p>
        </div>
      </div>
      <div className="mt-14 max-w-6xl mx-auto px-4">
        <div className="flex">
          <div className="flex flex-col mr-20">
            <label className="font-bold mb-2">First Name</label>
            <input className="border border-blue-600 px-3 py-2 rounded max-w-6xl md:w-96 "></input>
          </div>
          <div className="flex flex-col">
            <label className="font-bold mb-2">Last Name</label>
            <input className="border border-blue-600 px-3 py-2 rounded max-w-6xl md:w-96 "></input>
          </div>
        </div>
        <div className="flex flex-col mt-12">
          <label className="font-bold mb-2">Phone number</label>
          <input className="border border-blue-600 px-3 py-2 rounded max-w-6xl md:w-96 "></input>
        </div>
        <div className="flex flex-col mt-12">
          <label className="font-bold mb-2">Email address</label>
          <input className="border border-blue-600 px-3 py-2 rounded max-w-6xl md:w-96 "></input>
        </div>
        <div className="flex flex-col mt-12">
          <label className="font-bold mb-2">Blood Group</label>
          <input className="border border-blue-600 px-3 py-2 rounded max-w-6xl md:w-96 "></input>
        </div>
        <div className="flex mt-12">
          <div className="flex flex-col mr-20">
            <label className="font-bold mb-2">City</label>
            <input className="border border-blue-600 px-3 py-2 rounded max-w-6xl md:w-96 "></input>
          </div>
          <div className="flex flex-col">
            <label className="font-bold mb-2">Area Pincode</label>
            <input className="border border-blue-600 px-3 py-2 rounded max-w-6xl md:w-96 "></input>
          </div>
        </div>
        <div className="flex flex-col mt-12">
          <label className="font-bold mb-2">State</label>
          <input className="border border-blue-600 px-3 py-2 rounded max-w-6xl md:w-96 "></input>
        </div>
        <div className="flex flex-col mt-12">
          <span className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={check1}
              onChange={changeHandlerCheck1}
            />
            <div>Agree to terms and conditions</div>
          </span>
          <span className="flex items-center mt-3">
            <input
              type="checkbox"
              className="mr-2"
              checked={check2}
              onChange={changeHandlerCheck2}
            />
            <div>
              Allow the following information to be available to the public
              domain
            </div>
          </span>
          <div className="mt-10">
            <div
              className={`mb-10 ${
                showPhoneVerificationBlock ? null : "hidden"
              }`}
            >
              <div id="recaptcha"></div>
            </div>

            <button
              onClick={handleSubmit}
              className={`py-4 px-6 w-52 bg-blue-500 rounded  font-bold ${
                check1 && check2
                  ? "hover:bg-yellow-300 transition duration-100"
                  : "opacity-50  cursor-not-allowed"
              } `}
              disabled={check1 && check2 ? false : true}
            >
              Proceed {">>>>"}
            </button>
          </div>
          <div className="my-12 text-gray-600">
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
      </div>
    </div>
  );
};

export default plasmarequest;
