import dbConnect from "../../../../utils/dbConnect";
import PlasmaReq from "../../../../models/plasmareq";

const handler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      let { city, state, pincode, locality, skip, limit } = req.query;
      if (parseInt(skip) === NaN || parseInt(limit) === NaN) {
        res.status(400).json({ success: false });
        break;
      } else {
        skip = parseInt(skip);
        limit = parseInt(limit);
      }
      if (!skip) skip = 0;
      if (!limit) limit = 0;
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
      })
        .skip(skip)
        .limit(limit);
      res.status(200).json({ success: true, results });
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};

export default handler;
