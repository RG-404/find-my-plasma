import dbConnect from "../../../../utils/dbConnect";
import PlasmaReq from "../../../../models/plasmareq";
import { parse } from "postcss";

const isInt = (value) => {
  var er = /^-?[0-9]+$/;
  return er.test(value);
};

const handler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      let { city, state, pincode, locality, blood, skip, limit } = req.query;
      if (
        (pincode && !isInt(pincode)) ||
        (skip && !isInt(skip)) ||
        (limit && !isInt(limit))
      ) {
        res.status(400).json({
          success: false,
          message: "pincode, skip and limit must be numbers",
        });
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
      const query =
        pincode && blood
          ? {
              "address.pin": parseInt(searchQuery),
              bloodGroupNeeded: blood,
            }
          : pincode
          ? {
              "address.pin": parseInt(searchQuery),
            }
          : blood
          ? {
              [searchField]: {
                $regex: regex,
                $options: "i",
              },
              bloodGroupNeeded: blood,
            }
          : {
              [searchField]: {
                $regex: regex,
                $options: "i",
              },
            };
      const count = await PlasmaReq.countDocuments(query);
      try {
        const results = await PlasmaReq.find(query).skip(skip).limit(limit);
        let results_res_array = [];
        results.map((item) => {
          const createdAt_Date = new Date(item.createdAt);
          const date =
            createdAt_Date.getDate() > 9
              ? `${createdAt_Date.getDate()}`
              : `0${createdAt_Date.getDate()}`;
          const month =
            createdAt_Date.getMonth() - 1 > 9
              ? `${createdAt_Date.getMonth() - 1}`
              : `0${createdAt_Date.getMonth() - 1}`;
          const year = `${createdAt_Date.getFullYear()}`;
          results_res_array.push({
            name: item.name,
            bloodGroupNeeded: item.bloodGroupNeeded,
            age: item.age,
            hospital: item.hospital,
            address: {
              city: item.address.city,
              state: item.address.city,
            },
            identifier: item.identifier,
            createdAt: `${date}/${month}/${year}`,
          });
        });
        res.status(200).json({ success: true, data: results_res_array, count });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};

export default handler;
