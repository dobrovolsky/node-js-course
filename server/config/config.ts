import dotenv from "dotenv";

dotenv.config();

console.log(process.env.PORT, process.env.DB_URL);
export default {
  port: +(process.env.PORT || 8080),
  databaseURL: process.env.DB_URL || "",
};
