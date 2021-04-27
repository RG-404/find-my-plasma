import Firebase from "../../utils/firebase";

const handler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      res.status(200).json({ helo: "hello" });
      break;
    case "POST":
        const {phone} = 
    default:
      break;
  }
};

export default handler;
