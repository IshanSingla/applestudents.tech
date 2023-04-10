const mongoose = require("mongoose");

const connectDatabase = async () => {
  if (!mongoose.connections[0].readyState) {
    try {
      const con = await mongoose.connect(process.env.MONGODB_URI, {
        dbName: "main",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(`MongoDB is Connected with Host :${con.connection.host}`);
    } catch (error) {
      console.log("Error connecting to mongo.", error);
    }
  }
};

module.exports = { connectDatabase };
