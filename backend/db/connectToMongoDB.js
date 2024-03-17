import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Connected to MongoDB");
    console.log(
      "_________________________________________________________________________"
    );
  } catch (error) {
    console.log(
      "_________________________________________________________________________"
    );
    console.log("Error connecting to MongoDB", error.message);
    console.log(
      "_________________________________________________________________________"
    );
  }
};

export default connectToMongoDB;
