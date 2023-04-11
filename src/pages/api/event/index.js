const { connectDatabase } = require("@/server/config/mongodb");
const eventSchema = require("@/server/models/event.schema");

module.exports = async (req, res) => {
  await connectDatabase();
  let data = await eventSchema.find();
  res.status(200).json({ message: "Data Fetched", data });
};
