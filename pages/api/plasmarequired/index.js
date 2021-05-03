import dbConnect from "../../../utils/dbConnect";
import PlasmaReq from "../../../models/plasmareq";

const handler = async (req, res) => {
  const { method } = req;
  await dbConnect();
  switch (method) {
    case "GET":
      let { skip, limit, id, uniqueid } = req.query;
      if (id || uniqueid) {
        let query;
        if (id && uniqueid) {
          res.status(400).json({ success: false });
          break;
        }
        if (id) query = { identifier: id };
        if (uniqueid) query = { uid: uniqueid };
        try {
          let plasma_requests = await PlasmaReq.findOne(
            query,
            "name \
            email \
            phone \
            age \
            phoneAlt  \
            bloodGroup \
            bloodGroupNeeded \
            isInHospital \
            hospital \
            identifier \
            address.locality \
            address.city \
            address.state \
            address.pin \
            identifier \
            age \
            createdAt"
          );
          let data = plasma_requests.toJSON();
          const createdAt_Date = new Date(data.createdAt);
          const date =
            createdAt_Date.getDate() > 9
              ? `${createdAt_Date.getDate()}`
              : `0${createdAt_Date.getDate()}`;
          const month =
            createdAt_Date.getMonth() - 1 > 9
              ? `${createdAt_Date.getMonth() - 1}`
              : `0${createdAt_Date.getMonth() - 1}`;
          const year = `${createdAt_Date.getFullYear()}`;
          data.createdAt = `${date}/${month}/${year}`;
          res.status(200).json({ success: true, data: data });
          break;
        } catch (error) {
          console.log(error);
          res.status(400).json({ success: false });
          break;
        }
      } else {
        // parsing int
        if (parseInt(skip) === NaN || parseInt(limit) === NaN) {
          res.status(400).json({ success: false });
          break;
        } else {
          skip = parseInt(skip);
          limit = parseInt(limit);
        }
        if (!skip) skip = 0;
        if (!limit) limit = 0;
        try {
          const plasma_requests = await PlasmaReq.find(
            { isDeleted: false, isFullfilled: false },
            "name bloodGroupNeeded hospital address.city address.state identifier age createdAt"
          )
            .sort({ createdAt: 1 })
            .skip(skip)
            .limit(limit);
          let plasma_requests_res_array = [];
          plasma_requests.map((item) => {
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
            plasma_requests_res_array.push({
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
          res
            .status(200)
            .json({ success: true, data: plasma_requests_res_array });
          break;
        } catch (error) {
          console.log(error);
          res.status(400).json({ success: false });
          break;
        }
      }
    case "POST":
      let {
        name,
        email,
        age,
        phone,
        phoneAlt,
        bloodGroup,
        bloodGroupNeeded,
        address,
        hospital,
        isInHospital,
        uid,
      } = req.body;
      if (
        !name.first ||
        !name.last ||
        !age ||
        !phone ||
        !bloodGroup ||
        !bloodGroupNeeded ||
        !address.city ||
        !address.pin ||
        !address.state ||
        !uid
      ) {
        res.status(200).json({ success: false });
      } else {
        try {
          if (!phoneAlt) phoneAlt = "";
          const date = new Date();
          const identifier = `${name.first.toLowerCase()}${
            date.getUTCMonth() + 1
          }${date.getUTCDate()}${date.getUTCHours()}${date.getUTCMinutes()}${date.getUTCMilliseconds()}`;
          const user = await PlasmaReq.find({ phone });
          if (user.length > 0) {
            res.status(400).json({
              success: false,
              message: "Phone number already in use",
              code: "plasmarequest/phone-number-reused",
              identifier: user[0].identifier,
            });
          } else {
            const new_plasma_request = await PlasmaReq.create({
              name: `${name.first} ${name.last}`,
              email,
              phone,
              age,
              phoneAlt,
              bloodGroup,
              bloodGroupNeeded,
              isInHospital,
              hospital: isInHospital ? hospital : "",
              identifier,
              uid,
              address: {
                locality: address.locality,
                city: address.city,
                pin: address.pin,
                state: address.state,
              },
            }); /* create a new model in the database */
            res
              .status(201)
              .json({ success: true, identifier: new_plasma_request.identifier });
          }
        } catch (error) {
          console.log(error);
          res.status(400).json({ success: false });
        }
      }
      break;
    default:
      break;
  }
};

export default handler;
