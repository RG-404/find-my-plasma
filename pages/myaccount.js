import { useEffect, useState, Fragment } from "react";
import axios from "axios";
import firebase from "firebase/app";
import "firebase/auth";
import initFirebase from "../utils/firebase";
import Toast from "../components/Toast";
import Head from "next/head";

initFirebase();

const myaccount = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [showOTPBlock, setShowOTPBlock] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [loginLoading, setloginLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [isVerifyingOTP, setIsVerifyingOTP] = useState(false);

  const [OTP, setOTP] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [uid, setUid] = useState("");
  const [message, setMessage] = useState({ text: "", color: "" });

  const [expState, setExpState] = useState({});

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

  const handleInput = (event, setState) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setState(value);
  };

  const clearWarning = () => {
    if (message.text.length === 0) return;
    setMessage({
      text: "",
      color: "",
    });
  };

  const handleSubmit = async (event) => {
    if (phoneNumber.length < 10 || parseInt(phoneNumber) === NaN) {
      setMessage({
        text: "Please enter a valid phone number",
        color: "text-red-500",
      });
      return;
    }
    try {
      const res = await axios.get(
        `/api/plasmarequired/checkstatus/${phoneNumber}`
      );
      if (res.data.count) {
        setloginLoading(true);
        const recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha");
        const number = `+91${phoneNumber}`;
        const firebase_otp_response = await firebase
          .auth()
          .signInWithPhoneNumber(number, recaptcha);
        setExpState(firebase_otp_response);
        setShowOTPBlock(true);
        setShowToast(true);
        loginLoading(false);
      } else {
        setMessage({
          text:
            "No account found with this phone number. Please enter a valid phone number.",
          color: "text-red-500",
        });
      }
    } catch (error) {
      console.log(error);
      setloginLoading(false);
      if (error.code === "auth/too-many-requests") {
        console.log(error.message);
      }
    }
  };

  const handleFinalSubmit = async () => {
    setloginLoading(true);
    try {
      const result = await expState.confirm(OTP);
      const uid = result.user.uid;
      setUid(uid);
      setIsLoggedIn(true);
      setloginLoading(false);
    } catch (error) {
      setloginLoading(false);
      if (error.code === "auth/invalid-verification-code") {
        console.log("Wrong OTP");
      } else if (error.code === "auth/too-many-requests") {
        console.log(error.message);
      }
    }
  };

  useEffect(async () => {
    if (!uid) return;
    const res = await axios.get(`/api/plasmarequired?uniqueid=${uid}`);
    setData(res.data.data);
  }, [isLoggedIn]);

  return (
    <Fragment>
      <Head>
        <title>My Account</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta
          name="description"
          content="View, edit or remove your information
          from this website"
        />
      </Head>
      <div className="min-h-48">
        <div className="py-14 bg-gradient-to-t from-white via-blue-300 to-blue-500">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-4xl my-6">My Account</div>
            <p className="text-gray-600">
              Enter your phone number to view, edit or remove your information
              from this website.
            </p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4">
          {!isLoggedIn ? (
            <Fragment>
              <Toast
                show={showToast}
                className="mb-6"
                message={`OTP SENT TO +91 ${phoneNumber}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </Toast>
              <div
                className={`${showOTPBlock ? "hidden" : "flex"} flex-col mb-4`}
              >
                <label className="font-bold mb-2">Phone number</label>
                <div className="border border-blue-600 rounded max-w-6xl md:w-96 flex items-center">
                  <div className="px-2">+91</div>
                  <input
                    className="w-full px-3 py-2 bg-transparent"
                    name="tel"
                    value={phoneNumber}
                    onChange={(e) => {
                      clearWarning();
                      handleInput(e, setPhoneNumber);
                    }}
                  />
                </div>
              </div>
              <div
                className={`${showOTPBlock ? "flex" : "hidden"} flex-col mb-4`}
              >
                <label className="font-bold mb-2">OTP</label>
                <input
                  className="border border-blue-600 px-3 py-2 rounded max-w-6xl md:w-96"
                  name="state"
                  value={OTP}
                  onChange={(e) => {
                    handleInput(e, setOTP);
                  }}
                />
              </div>
              {message.text ? (
                <div className={`my-4 ${message.color}`}>{message.text}</div>
              ) : null}
              {loginLoading ? <div className="my-4">Verifying ...</div> : null}
              <div
                className={`mb-10 ${
                  loginLoading && !showOTPBlock ? "block" : "hidden"
                }`}
              >
                <div id="recaptcha"></div>
              </div>
              <button
                disabled={buttonDisabled}
                onClick={showOTPBlock ? handleFinalSubmit : handleSubmit}
                className={`py-2 px-6 mb-14 ${
                  loginLoading ? "hidden" : "block"
                } bg-blue-500 rounded font-bold hover:bg-yellow-300 transition duration-100 `}
              >
                {showOTPBlock ? "LOGIN >>>" : "PROCEED >>>"}
              </button>
            </Fragment>
          ) : (
            <Fragment>
              <div className="text-4xl my-6">Summary</div>
              <div>
                <span className="flex mb-2">
                  <p className="font-bold md:w-1/4">Name:&nbsp;</p>
                  <p className="text-gray-600">{data.name}</p>
                </span>
                <span className="flex mb-2">
                  <p className="font-bold md:w-1/4">Date of listing:&nbsp;</p>
                  <p className="text-gray-600">{data.createdAt}</p>
                </span>
                <span className="flex mb-2">
                  <p className="font-bold md:w-1/4">Blood Group:&nbsp;</p>
                  <p className="text-gray-600">{data.bloodGroup}</p>
                </span>
                <span className="flex mb-2">
                  <p className="font-bold md:w-1/4">
                    Accepted Blood Group(s):&nbsp;
                  </p>
                  <p className="text-gray-600">
                    {data.bloodGroupNeeded.join(", ")}
                  </p>
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
                  <p className="font-bold md:w-1/4">
                    Phone Number (alt):&nbsp;
                  </p>
                  <p className="text-gray-600">
                    {data.phoneAlt ? `+91 ${data.phoneAlt}` : "N/A"}
                  </p>
                </span>
                <span className="flex mb-2">
                  <p className="font-bold md:w-1/4">In hospital:&nbsp;</p>
                  <p className="text-gray-600">
                    {data.isInHospital ? "Yes" : "No"}
                  </p>
                </span>
                <span className="flex mb-2">
                  <p className="font-bold md:w-1/4">Hospital:&nbsp;</p>
                  <p className="text-gray-600">
                    {data.hospital ? data.hospital : "N/A"}
                  </p>
                </span>
              </div>
              <div className="mt-10 mb-14">
                <div className="text-3xl mb-3">Status</div>
                <div className="mb-3">Looking for plasma</div>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default myaccount;
