const { connectDatabase } = require("@/server/config/mongodb");
const eventSchema = require("@/server/models/event.schema");
const { getServerSession } = require("next-auth");
const { authOptions } = require("../../auth/[...nextauth]");
const registrationSchema = require("@/server/models/registration.schema");

module.exports = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: "Unauthorized Please Login" });
    return;
  }
  await connectDatabase();
  let data = await eventSchema.findOne({ route: req?.query?.id ?? "" });
  if (data) {
    data = data.toObject();
    if (data.isEventOpen) {
      if (
        data.emailVerification &&
        !session.user.email.includes("@chitkara.edu.in")
      ) {
        res.status(401).json({ message: "Unauthorized Email" });
        return;
      }
      let regester = await registrationSchema.findOne({
        user: data._id,
        event: data._id,
      });
      if (regester) {
        return res.status(200).json({ message: "Already Registered" });
      } else {
        let newdata = await new registrationSchema({
          _id: new mongoose.Types.ObjectId(),
          event: data._id,
          user: data._id,
          verified: data?.eventAutoVerify,
        }).save();

        return res
          .status(200)
          .json({
            message: "Registered",
            applrovalWait: data?.eventAutoVerify,
          });
      }
    } else {
      res.status(404).json({ message: "Registration Closed" });
    }
    res.status(200).json({ message: "Data Fetched", data });
  } else {
    res.status(404).json({ message: "Data Not Found" });
  }
};
