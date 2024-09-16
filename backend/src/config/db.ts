import mongoose from "mongoose";
import config from "./config";

export const db = async () => {
  await mongoose.connect(config.dbUrl as string, {
    dbName: "auth_learn",
  });
  console.log("DB connection successfull.");
};
