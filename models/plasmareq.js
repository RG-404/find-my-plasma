import mongoose from "mongoose";

const PlasmaReqSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    phone: {
      type: Number,
    },
    bloodGroup: {
      type: String,
    },
    address: {
      city: {
        type: String,
      },
      pin: {
        type: Number,
      },
      state: {
        type: String,
      },
    },
    signature: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.PlasmaReq ||
  mongoose.model("PlasmaReq", PlasmaReqSchema);
