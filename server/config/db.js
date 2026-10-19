const mongoose = require("mongoose");

async function connectToMongoDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("MONGO_URI is missing. Set it in server/.env.");
  }
  if (/REPLACE_WITH|<db_password>|<password>/i.test(uri)) {
    throw new Error(
      "MONGO_URI still contains a password placeholder. Run configure-atlas.ps1 and enter your Atlas password at the hidden prompt."
    );
  }

  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
  console.log("You successfully connected to MongoDB!");
  return mongoose;
}

async function disconnectFromMongoDB() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
    console.log("Disconnected from MongoDB.");
  }
}

module.exports = { connectToMongoDB, disconnectFromMongoDB };
