const mongoose = require("mongoose");
const databaseUrl = process.env.MONGO_ATLAS;

const connectDatabase = async () => {
  try {
    const con = await mongoose.connect(
      "mongodb+srv://apple:C7Jx64Fvesc5FM7r@cluster0.ecte2b4.mongodb.net/testc?retryWrites=true&w=majority",
      { dbName: "main", useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log(`MongoDB is Connected with Host :${con.connection.host}`);
  } catch (error) {
    console.log("Error connecting to mongo.", error);
  }
};

module.exports = { connectDatabase };
