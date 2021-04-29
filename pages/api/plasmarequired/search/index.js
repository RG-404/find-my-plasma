import dbConnect from "../../../../utils/dbConnect";
import PlasmaReq from "../../../../models/plasmareq";

const handler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      const { city, state, pincode, locality } = req.query;
      const searchQuery = city
        ? city
        : state
        ? state
        : pincode
        ? pincode
        : locality
        ? locality
        : undefined;
      const searchField = city
        ? "address.city"
        : state
        ? "address.state"
        : pincode
        ? "address.pin"
        : locality
        ? "address.locality"
        : undefined;
      const regex = new RegExp(searchQuery);
      const results = await PlasmaReq.find({
        [searchField]: {
          $regex: regex,
          $options: "i",
        },
      });
      res.status(200).json({ success: true, results });
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};

export default handler;
