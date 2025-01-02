import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();

const DBURI = process.env.DATABASE_URL;

mongoose
  .connect(DBURI)
  .then(() => console.log("Connected to database"))
  .catch((error) => {
    console.error("Error connecting to database");
    process.exit(1);
  });

const db = mongoose.connection;

export default db;
