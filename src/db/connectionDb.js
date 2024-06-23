import mongoose from "mongoose";

const connectiondb = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1/assignment-8");
    console.log("connected to db successfully");
  } catch (err) {
    console.log("failed to connect to db", err);
  }
};

export default connectiondb;
