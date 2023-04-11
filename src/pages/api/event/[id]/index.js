const { connectDatabase } = require("@/server/config/mongodb");
const eventSchema = require("@/server/models/event.schema");

module.exports = async (req, res) => {
  await connectDatabase();
  let data = await eventSchema.findOne({ route: req?.query?.id ?? "" });
  if (data) {
    data = data.toObject();
    data.eventDescription = data.eventDescription.replace(/\\n/g, "<br>");
    res.status(200).json({ message: "Data Fetched", data });
  } else {
    res.status(404).json({ message: "Data Not Found" });
  }
};
