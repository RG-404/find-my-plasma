import dbConnect from "../../utils/dbConnect";
import User from "../../models/plasmareq";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const pets = await User.find(
          {}
        ); /* find all the data in our database */
        res.status(200).json({ success: true, data: pets });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      console.log(req.body);
      // validation
      const { name, email, phone, blood, address } = req.body;
      if (
        !name.first ||
        !name.last ||
        !email ||
        !phone ||
        !blood ||
        !address.city ||
        !address.pin ||
        !address.state
      ) {
        res.status(200).json({ success: false });
      } else {
        try {
          const pet = await User.create({
            name: `${name.first} ${name.last}`,
            email,
            phone,
            bloodGroup: blood,
            address: {
              city: address.city,
              pin: address.pin,
              state: address.state,
            },
          }); /* create a new model in the database */
          res.status(201).json({ success: true, data: pet });
        } catch (error) {
          res.status(400).json({ success: false });
        }
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
