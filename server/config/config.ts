import dotenv from "dotenv";
import { Algorithm } from "jsonwebtoken";

dotenv.config();
export default {
  port: +(process.env.PORT || 8080),
  databaseURL: process.env.DB_URL || "",
  jtwSecretKey: process.env.JWT_SECRET_KEY || "",
  jwtAlgo: "HS256" as Algorithm,
  jwtTTL: 60 * 60 * 60, // 1h
};
