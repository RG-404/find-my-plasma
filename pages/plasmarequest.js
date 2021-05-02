import { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import firebase from "firebase/app";
import "firebase/auth";
import initFirebase from "../utils/firebase";

import axios from "axios";
import Toast from "../components/Toast";

initFirebase();

const plasmarequest = () => {
  const router = useRouter();

  const [checkConsent, setCheckConsent] = useState(false);

  const [showPhoneVerificationBlock, setShowPhoneVerificationBlock] = useState(
    false
  );
  const [showOTPfieldBlock, setShowOTPfieldBlock] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberAlt, setPhoneNumberAlt] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [bloodGroupNeeded, setBloodGroupNeeded] = useState([]);
  const [locality, setLocality] = useState("");
  const [city, setCity] = useState("");
  const [areaPincode, setAreaPincode] = useState("");
  const [stateName, setStateName] = useState("");
  const [OTP, setOTP] = useState("");
  const [isInHospital, setIsInHospital] = useState(false);
  const [hospital, setHospital] = useState("");

  const [fieldMessages, setFieldMessages] = useState({
    firstName: "",
    lastName: "",
    age: "",
    phoneNumber: "",
    phoneNumberAlt: "",
    emailAddress: "",
    bloodGroup: "",
    bloodGroupNeeded: "",
    locality: "",
    city: "",
    areaPincode: "",
    stateName: "",
    hospital: "",
  });

  const [toastId, setToastId] = useState("");

  const [toastMessage, setToastMessage] = useState({
    text: "",
    warn: false,
  });

  const [submitMessage, setSubmitMessage] = useState("");

  const [buttonLoading, setButtonLoading] = useState(false);

  const [expState, setExpState] = useState({});

  const [checkAp, setCheckAp] = useState(false);
  const [checkAn, setCheckAn] = useState(false);
  const [checkBp, setCheckBp] = useState(false);
  const [checkBn, setCheckBn] = useState(false);
  const [checkOp, setCheckOp] = useState(false);
  const [checkOn, setCheckOn] = useState(false);
  const [checkABp, setCheckABp] = useState(false);
  const [checkABn, setCheckABn] = useState(false);

  useEffect(() => {
    let accepteableBloodGroups = [];
    if (checkAp) accepteableBloodGroups.push("A+");
    if (checkAn) accepteableBloodGroups.push("A-");
    if (checkBp) accepteableBloodGroups.push("B+");
    if (checkBn) accepteableBloodGroups.push("B-");
    if (checkOp) accepteableBloodGroups.push("O+");
    if (checkOn) accepteableBloodGroups.push("O-");
    if (checkABp) accepteableBloodGroups.push("AB+");
    if (checkABn) accepteableBloodGroups.push("AB-");
    setBloodGroupNeeded(accepteableBloodGroups);
  }, [
    checkAp,
    checkAn,
    checkBp,
    checkBn,
    checkOp,
    checkOn,
    checkABp,
    checkABn,
  ]);

  const handleInput = (event, setState) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setState(value);
  };

  // form data validation
  const validateForm = () => {
    if (
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !age ||
      !bloodGroup ||
      !(bloodGroupNeeded.length > 0) ||
      !city ||
      !stateName ||
      !areaPincode
    )
      return false;
    else {
      return true;
    }
  };

  const handleSubmit = async (event) => {
    if (validateForm()) {
      setShowPhoneVerificationBlock(true);
      setSubmitMessage("Verifying...");
      setButtonLoading(true);
      const recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha");
      const number = `+91${phoneNumber}`;
      try {
        const firebase_otp_response = await firebase
          .auth()
          .signInWithPhoneNumber(number, recaptcha);
        setExpState(firebase_otp_response);
        setShowPhoneVerificationBlock(false);
        setShowOTPfieldBlock(true);
        setButtonLoading(false);
      } catch (error) {
        setButtonLoading(false);
        setShowPhoneVerificationBlock(false);
        if (error.code === "auth/too-many-requests") {
          console.log(error.message);
        }
      }
    }
  };

  const handleFinalSubmit = async () => {
    try {
      setButtonLoading(true);
      setSubmitMessage("Submitting plasma request...");
      const result = await expState.confirm(OTP);
      const data = {
        name: {
          first: firstName,
          last: lastName,
        },
        age,
        uid: result.user.uid,
        email: emailAddress,
        phone: phoneNumber,
        phoneAlt: phoneNumberAlt,
        address: {
          locality: locality,
          city: city,
          pin: areaPincode,
          state: stateName,
        },
        bloodGroup,
        bloodGroupNeeded,
        isInHospital,
        hospital,
      };
      const response_plasmarequired = await axios.post(
        "/api/plasmarequired",
        data
      );
      if (response_plasmarequired.data.success) {
        setToastMessage({
          text: "PLASMA REQUEST CREATED SUCCESSFULLY",
          warn: false,
        });
      } else {
        setToastMessage({
          text: "SOMETHING WENT WRONG",
          warn: true,
        });
      }
      router.push("#form");

      setButtonLoading(false);
    } catch (error) {
      setButtonLoading(false);

      setShowPhoneVerificationBlock(false);
      if (error.code === "auth/invalid-verification-code") {
        console.log(error.message);
      } else if (error.code === "auth/too-many-requests") {
        console.log(error.message);
      }
    }
  };

  const isInt = (value) => {
    var er = /^-?[0-9]+$/;
    return er.test(value);
  };

  const isEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <Fragment>
      <Head>
        <title>Make Plasma Request</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta
          name="description"
          content="Register your name for
            donors to find and contact you"
        />
      </Head>
      <div className="py-14 bg-gradient-to-t from-white via-blue-300 to-blue-500">
        <div className="max-w-6xl mx-auto px-4 ">
          <div className="text-4xl my-6">Register as patient</div>
          <p className="text-gray-600">
            Kindly fill up the following form to register your name so that the
            donor can find and contact you. We hope you get better soon.
          </p>
        </div>
      </div>
      <div className="pt-14 max-w-6xl mx-auto md:px-4 px-7" id="form">
        <Toast
          id={toastId}
          show={toastMessage.text.length ? true : false}
          className="mb-12"
          message={toastMessage.text}
          warn={toastMessage.warn}
        />
        <div className="md:flex">
          <div className="flex flex-col md:mr-20 mb-12 md:mb-0">
            <label className="font-bold mb-2">First Name</label>
            <input
              className="border border-blue-600 px-3 py-2 rounded max-w-6xl md:w-96"
              name="given-name"
              value={firstName}
              onChange={(e) => {
                handleInput(e, setFirstName);
              }}
              onBlur={(e) => {
                if (!e.target.value) {
                  setFieldMessages({
                    ...fieldMessages,
                    firstName: "First name cannot be empty",
                  });
                } else {
                  setFieldMessages({
                    ...fieldMessages,
                    firstName: "",
                  });
                }
              }}
            />
            {fieldMessages.firstName ? (
              <div className="mt-2 text-red-600">{fieldMessages.firstName}</div>
            ) : null}
          </div>
          <div className="flex flex-col">
            <label className="font-bold mb-2">Last Name</label>
            <input
              className="border border-blue-600 px-3 py-2 rounded max-w-6xl md:w-96"
              name="family-name"
              value={lastName}
              onChange={(e) => {
                handleInput(e, setLastName);
              }}
              onBlur={(e) => {
                if (!e.target.value) {
                  setFieldMessages({
                    ...fieldMessages,
                    lastName: "Last name cannot be empty",
                  });
                } else {
                  setFieldMessages({
                    ...fieldMessages,
                    lastName: "",
                  });
                }
              }}
            />
            {fieldMessages.lastName ? (
              <div className="mt-2 text-red-600">{fieldMessages.lastName}</div>
            ) : null}
          </div>
        </div>
        <div className="flex flex-col mt-10">
          <label className="font-bold mb-2">Phone number</label>
          <div className="border border-blue-600 rounded max-w-6xl md:w-96 flex items-center">
            <div className="px-2">+91</div>
            <input
              className="w-full px-3 py-2 bg-transparent"
              name="tel"
              type="number"
              value={phoneNumber}
              onChange={(e) => {
                handleInput(e, setPhoneNumber);
              }}
              onBlur={(e) => {
                if (e.target.value.length != 10) {
                  setFieldMessages({
                    ...fieldMessages,
                    phoneNumber: "Please enter a valid phone number",
                  });
                } else {
                  setFieldMessages({
                    ...fieldMessages,
                    phoneNumber: "",
                  });
                }
              }}
            />
          </div>
          {fieldMessages.phoneNumber ? (
            <div className="mt-2 text-red-600">{fieldMessages.phoneNumber}</div>
          ) : null}
        </div>
        <div className="flex flex-col mt-10">
          <label className="font-bold mb-2">
            Alternate Phone number (optional)
          </label>
          <div className="border border-blue-600 rounded max-w-6xl md:w-96 flex items-center">
            <div className="px-2">+91</div>
            <input
              className="w-full px-3 py-2 bg-transparent"
              name="tel-alt"
              value={phoneNumberAlt}
              onChange={(e) => {
                handleInput(e, setPhoneNumberAlt);
              }}
              onBlur={(e) => {
                if (!e.target.value) {
                  setFieldMessages({
                    ...fieldMessages,
                    phoneNumberAlt: "",
                  });
                } else if (e.target.value.length != 10) {
                  setFieldMessages({
                    ...fieldMessages,
                    phoneNumberAlt: "Please enter a valid phone number",
                  });
                } else {
                  setFieldMessages({
                    ...fieldMessages,
                    phoneNumberAlt: "",
                  });
                }
              }}
            />
          </div>
          {fieldMessages.phoneNumberAlt ? (
            <div className="mt-2 text-red-600">
              {fieldMessages.phoneNumberAlt}
            </div>
          ) : null}
        </div>
        <div className="flex flex-col mt-10">
          <label className="font-bold mb-2">Email address (optional )</label>
          <input
            className="border border-blue-600 px-3 py-2 rounded max-w-6xl md:w-96"
            name="email"
            value={emailAddress}
            onChange={(e) => {
              handleInput(e, setEmailAddress);
            }}
            onBlur={(e) => {
              if (!e.target.value) {
                setFieldMessages({
                  ...fieldMessages,
                  emailAddress: "",
                });
              } else if (!isEmail(e.target.value)) {
                setFieldMessages({
                  ...fieldMessages,
                  emailAddress: "Please enter a valid email address",
                });
              } else {
                setFieldMessages({
                  ...fieldMessages,
                  emailAddress: "",
                });
              }
            }}
          />
          {fieldMessages.emailAddress ? (
            <div className="mt-2 text-red-600">
              {fieldMessages.emailAddress}
            </div>
          ) : null}
        </div>
        <div className="flex flex-col mt-10">
          <label className="font-bold mb-2">Age</label>
          <input
            className="border border-blue-600 px-3 py-2 rounded max-w-6xl md:w-96"
            name="age"
            type="number"
            value={age}
            onChange={(e) => {
              handleInput(e, setAge);
            }}
            onBlur={(e) => {
              if (parseInt(e.target.value) < 0 || !e.target.value) {
                setFieldMessages({
                  ...fieldMessages,
                  age: "Please enter a valid age",
                });
              } else {
                setFieldMessages({
                  ...fieldMessages,
                  age: "",
                });
              }
            }}
          />
          {fieldMessages.age ? (
            <div className="mt-2 text-red-600">{fieldMessages.age}</div>
          ) : null}
        </div>
        <div className="flex flex-col mt-10">
          <label className="font-bold mb-2">Your Blood Group</label>
          <select
            className="border border-blue-600 px-3 py-2 rounded max-w-6xl md:w-96"
            name="blood-group"
            value={bloodGroup}
            onChange={(e) => {
              handleInput(e, setBloodGroup);
            }}
          >
            <option value="default" hidden defaultValue>
              &nbsp;
            </option>
            <option value="A+">A RhD positive (A+)</option>
            <option value="A-">A RhD negative (A-)</option>
            <option value="B+">A RhD negative (B+)</option>
            <option value="B-">B RhD positive (B-)</option>
            <option value="O+">B RhD negative (O+)</option>
            <option value="O-">O RhD positive (O-)</option>
            <option value="AB+">O RhD negative (AB+)</option>
            <option value="AB-">AB RhD positive (AB-)</option>
          </select>
        </div>
        <div className="flex flex-col mt-10">
          <label className="font-bold mb-2">Acceptable Blood Groups</label>
          <span className="flex items-center mt-3">
            <input
              type="checkbox"
              className="mr-2"
              checked={checkAp}
              onChange={(e) => {
                handleInput(e, setCheckAp);
              }}
            />
            <div>A RhD positive (A+)</div>
          </span>
          <span className="flex items-center mt-3">
            <input
              type="checkbox"
              className="mr-2"
              checked={checkAn}
              onChange={(e) => {
                handleInput(e, setCheckAn);
              }}
            />
            <div>A RhD negative (A-)</div>
          </span>
          <span className="flex items-center mt-3">
            <input
              type="checkbox"
              className="mr-2"
              checked={checkBp}
              onChange={(e) => {
                handleInput(e, setCheckBp);
              }}
            />
            <div>B RhD positive (B+)</div>
          </span>
          <span className="flex items-center mt-3">
            <input
              type="checkbox"
              className="mr-2"
              checked={checkBn}
              onChange={(e) => {
                handleInput(e, setCheckBn);
              }}
            />
            <div>B RhD negative (B-)</div>
          </span>
          <span className="flex items-center mt-3">
            <input
              type="checkbox"
              className="mr-2"
              checked={checkOp}
              onChange={(e) => {
                handleInput(e, setCheckOp);
              }}
            />
            <div>O RhD positive (O+)</div>
          </span>
          <span className="flex items-center mt-3">
            <input
              type="checkbox"
              className="mr-2"
              checked={checkOn}
              onChange={(e) => {
                handleInput(e, setCheckOn);
              }}
            />
            <div>O RhD negative (O-)</div>
          </span>
          <span className="flex items-center mt-3">
            <input
              type="checkbox"
              className="mr-2"
              checked={checkABp}
              onChange={(e) => {
                handleInput(e, setCheckABp);
              }}
            />
            <div>AB RhD positive (AB+)</div>
          </span>
          <span className="flex items-center mt-3">
            <input
              type="checkbox"
              className="mr-2"
              checked={checkABn}
              onChange={(e) => {
                handleInput(e, setCheckABn);
              }}
            />
            <div>AB RhD negative (AB-)</div>
          </span>
        </div>
        <div className="flex flex-col mt-10">
          <label className="font-bold mb-2">Hospital</label>
          <div className="flex items-start md:items-center py-2">
            <div className="pr-1 pt-1 md:pr-0 md:pt-0 flex items-start md:items-center">
              <input
                type="checkbox"
                className="mr-2 form-checkbox"
                checked={isInHospital}
                onChange={(e) => {
                  handleInput(e, setIsInHospital);
                }}
              />
            </div>
            <div>The patient is currently admitted in a hospital</div>
          </div>
          {isInHospital ? (
            <div className="flex flex-col mt-10">
              <label className="font-bold mb-2">Hospital</label>
              <input
                className="border border-blue-600 px-3 py-2 rounded max-w-6xl md:w-96"
                name="hospital"
                value={hospital}
                onChange={(e) => {
                  handleInput(e, setHospital);
                }}
                onBlur={(e) => {
                  if (!e.target.value.length && isInHospital) {
                    setFieldMessages({
                      ...fieldMessages,
                      hospital: "Please enter the name of the hospital",
                    });
                  } else {
                    setFieldMessages({
                      ...fieldMessages,
                      hospital: "",
                    });
                  }
                }}
              />
              {fieldMessages.hospital ? (
                <div className="mt-2 text-red-600">
                  {fieldMessages.hospital}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
        <div className="flex flex-col mt-10">
          <label className="font-bold mb-2">Locality (optional)</label>
          <input
            className="border border-blue-600 px-3 py-2 rounded max-w-6xl md:w-96"
            name="locality"
            value={locality}
            onChange={(e) => {
              handleInput(e, setLocality);
            }}
          />
        </div>
        <div className="md:flex mt-10">
          <div className="flex flex-col md:mr-20 mb-12 md:mb-0">
            <label className="font-bold mb-2">City</label>
            <input
              className="border border-blue-600 px-3 py-2 rounded max-w-6xl md:w-96"
              name="city"
              value={city}
              onChange={(e) => {
                handleInput(e, setCity);
              }}
              onBlur={(e) => {
                if (!e.target.value.length) {
                  setFieldMessages({
                    ...fieldMessages,
                    city: "Please enter a city",
                  });
                } else {
                  setFieldMessages({
                    ...fieldMessages,
                    city: "",
                  });
                }
              }}
            />
            {fieldMessages.city ? (
              <div className="mt-2 text-red-600">{fieldMessages.city}</div>
            ) : null}
          </div>
          <div className="flex flex-col">
            <label className="font-bold mb-2">Area Pincode</label>
            <input
              className="border border-blue-600 px-3 py-2 rounded max-w-6xl md:w-96"
              name="postal-code"
              type="number"
              value={areaPincode}
              onChange={(e) => {
                handleInput(e, setAreaPincode);
              }}
              onBlur={(e) => {
                if (e.target.value.length != 6) {
                  setFieldMessages({
                    ...fieldMessages,
                    areaPincode: "Please enter a valid pin code",
                  });
                } else {
                  setFieldMessages({
                    ...fieldMessages,
                    areaPincode: "",
                  });
                }
              }}
            />
            {fieldMessages.areaPincode ? (
              <div className="mt-2 text-red-600">
                {fieldMessages.areaPincode}
              </div>
            ) : null}
          </div>
        </div>
        <div className="flex flex-col mt-10">
          <label className="font-bold mb-2">State</label>
          <input
            className="border border-blue-600 px-3 py-2 rounded max-w-6xl md:w-96"
            name="state"
            value={stateName}
            onChange={(e) => {
              handleInput(e, setStateName);
            }}
            onBlur={(e) => {
              if (!e.target.value.length) {
                setFieldMessages({
                  ...fieldMessages,
                  stateName: "Please enter a state",
                });
              } else {
                setFieldMessages({
                  ...fieldMessages,
                  stateName: "",
                });
              }
            }}
          />
          {fieldMessages.stateName ? (
            <div className="mt-2 text-red-600">{fieldMessages.stateName}</div>
          ) : null}
        </div>
        <div className="flex flex-col mt-10">
          <span className="flex items-start md:items-center mt-3">
            <div className="pr-1 pt-1 md:pr-0 md:pt-0 flex items-start md:items-center">
              <input
                type="checkbox"
                className="mr-2 form-checkbox"
                checked={checkConsent}
                onChange={(e) => {
                  handleInput(e, setCheckConsent);
                }}
              />
            </div>
            <div>
              Allow the following information to be available to the public
              domain
            </div>
          </span>
          <div className="mt-10">
            {buttonLoading ? <div>{submitMessage}</div> : null}
            <div
              className={`mb-10 ${
                showPhoneVerificationBlock ? null : "hidden"
              }`}
            >
              <div id="recaptcha"></div>
            </div>
            <div
              className={`flex flex-col mb-10 ${
                showOTPfieldBlock && !buttonLoading ? null : "hidden"
              }`}
            >
              <label className="font-bold mb-2">OTP</label>
              <input
                className="border border-blue-600 px-3 py-2 rounded max-w-6xl md:w-96"
                name="one-time-code"
                value={OTP}
                onChange={(e) => {
                  handleInput(e, setOTP);
                }}
              />
            </div>
            {buttonLoading ? null : (
              <button
                onClick={!showOTPfieldBlock ? handleSubmit : handleFinalSubmit}
                className={`py-4 px-6 w-52 bg-blue-500 rounded  font-bold ${
                  checkConsent && validateForm()
                    ? "hover:bg-yellow-300 transition duration-100"
                    : "opacity-50  cursor-not-allowed"
                } `}
                disabled={checkConsent && validateForm() ? false : true}
              >
                {!showOTPfieldBlock ? "Get OTP >>>>" : "Submit >>>>"}
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="my-12 max-w-6xl mx-auto md:px-4 px-7 text-gray-600">
        {[
          "The information displayed in the website will solely depend on the \
          data you entered.",
          "You can edit and view your information anytime you want from this website.",
          "You can remove your name and details after you receive your treatment.",
        ].map((item) => (
          <p className="border-l border-blue-500 pl-3 mb-8">{item}</p>
        ))}
      </div>
    </Fragment>
  );
};

export default plasmarequest;
