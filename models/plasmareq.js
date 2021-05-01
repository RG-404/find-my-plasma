import mongoose from "mongoose";

const PlasmaReqSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: false,
    },
    email: {
      type: String,
      default: "",
    },
    phone: {
      type: Number,
      required: true,
    },
    phoneAlt: {
      type: Number,
      default: null,
    },
    bloodGroup: {
      type: String,
      required: true,
    },
    bloodGroupNeeded: {
      type: [String],
      required: true,
    },
    isInHospital: {
      type: Boolean,
      required: true,
    },
    hospital: {
      type: String,
      default: "",
    },
    address: {
      locality: {
        type: String,
        required: false,
        default: "",
      },
      city: {
        type: String,
        required: true,
      },
      pin: {
        type: Number,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
    },
    identifier: {
      type: String,
      required: true,
    },
    uid: {
      type: String,
      default: "",
    },
    isFullfilled: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.PlasmaReq ||
  mongoose.model("PlasmaReq", PlasmaReqSchema);
