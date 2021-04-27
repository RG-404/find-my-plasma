import { useEffect, useState } from "react";
import Firebase from "../utils/firebase";

const plasmarequest = () => {
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [showPhoneVerificationBlock, setShowPhoneVerificationBlock] = useState(
    false
  );
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberAlt, setPhoneNumberAlt] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [city, setCity] = useState("");
  const [areaPincode, setAreaPincode] = useState("");
  const [stateName, setStateName] = useState("");
  const [OTP, setOTP] = useState("");

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

  const handleTextInput = (event, setState) => {
    setState(event.target.value);
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
      console.log(result);
    } catch (error) {
      console.log("NONONONONO");
      console.log(error);
    }
  };

  const handleSubmit_DEV = async () => {
    console.log({
      firstName,
      lastName,
      phoneNumber,
      phoneNumberAlt,
      emailAddress,
      bloodGroup,
      city,
      areaPincode,
      stateName,
    });
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
            <input
              className="border border-blue-600 px-3 py-2 rounded max-w-6xl md:w-96"
              name="given-name"
              value={firstName}
              onChange={(e) => {
                handleTextInput(e, setFirstName);
              }}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-bold mb-2">Last Name</label>
            <input
              className="border border-blue-600 px-3 py-2 rounded max-w-6xl md:w-96"
              name="family-name"
              value={lastName}
              onChange={(e) => {
                handleTextInput(e, setLastName);
              }}
            />
          </div>
        </div>
        <div className="flex flex-col mt-12">
          <label className="font-bold mb-2">Phone number</label>
          <div className="border border-blue-600 rounded max-w-6xl md:w-96 flex items-center">
            <div className="px-2">+91</div>
            <input
              className="w-full px-3 py-2 bg-transparent"
              name="tel"
              value={phoneNumber}
              onChange={(e) => {
                handleTextInput(e, setPhoneNumber);
              }}
            />
          </div>
        </div>
        <div className="flex flex-col mt-12">
          <label className="font-bold mb-2">Alternate Phone number</label>
          <div className="border border-blue-600 rounded max-w-6xl md:w-96 flex items-center">
            <div className="px-2">+91</div>
            <input
              className="w-full px-3 py-2 bg-transparent"
              name="tel-alt"
              value={phoneNumberAlt}
              onChange={(e) => {
                handleTextInput(e, setPhoneNumberAlt);
              }}
            />
          </div>
        </div>
        <div className="flex flex-col mt-12">
          <label className="font-bold mb-2">Email address</label>
          <input
            className="border border-blue-600 px-3 py-2 rounded max-w-6xl md:w-96"
            name="email"
            value={emailAddress}
            onChange={(e) => {
              handleTextInput(e, setEmailAddress);
            }}
          />
        </div>
        <div className="flex flex-col mt-12">
          <label className="font-bold mb-2">Blood Group</label>
          <select
            className="border border-blue-600 px-3 py-2 rounded max-w-6xl md:w-96"
            name="blood-group"
            value={bloodGroup}
            onChange={(e) => {
              handleTextInput(e, setBloodGroup);
            }}
          >
            <option value="default" hidden defaultValue>
              &nbsp;
            </option>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </div>

        <div className="flex mt-12">
          <div className="flex flex-col mr-20">
            <label className="font-bold mb-2">City</label>
            <input
              className="border border-blue-600 px-3 py-2 rounded max-w-6xl md:w-96"
              name="city"
              value={city}
              onChange={(e) => {
                handleTextInput(e, setCity);
              }}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-bold mb-2">Area Pincode</label>
            <input
              className="border border-blue-600 px-3 py-2 rounded max-w-6xl md:w-96"
              name="postal-code"
              value={areaPincode}
              onChange={(e) => {
                handleTextInput(e, setAreaPincode);
              }}
            />
          </div>
        </div>
        <div className="flex flex-col mt-12">
          <label className="font-bold mb-2">State</label>
          <input
            className="border border-blue-600 px-3 py-2 rounded max-w-6xl md:w-96"
            name="state"
            value={stateName}
            onChange={(e) => {
              handleTextInput(e, setStateName);
            }}
          />
        </div>
        <div className="flex flex-col mt-12">
          <span className="flex items-center mt-3">
            <input
              type="checkbox"
              className="mr-2"
              checked={check1}
              onChange={changeHandlerCheck1}
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
            <div className="flex flex-col mb-10">
              <label className="font-bold mb-2">OTP</label>
              <input
                className="border border-blue-600 px-3 py-2 rounded max-w-6xl md:w-96"
                name="one-time-code"
                value={OTP}
                onChange={(e) => {
                  handleTextInput(e, setOTP);
                }}
              />
            </div>
            <button
              onClick={handleSubmit}
              className={`py-4 px-6 w-52 bg-blue-500 rounded  font-bold ${
                check1
                  ? "hover:bg-yellow-300 transition duration-100"
                  : "opacity-50  cursor-not-allowed"
              } `}
              disabled={check1 ? false : true}
            >
              Proceed {">>>>"}
            </button>
          </div>
        </div>
      </div>
      <div className="my-12 max-w-6xl mx-auto px-4 text-gray-600">
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

export default plasmarequest;
