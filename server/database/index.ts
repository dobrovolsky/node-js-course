import { Sequelize } from "sequelize";
import config from "../config/config";

export const sequelize = new Sequelize(config.databaseURL);

async function checkConnection(sequelize: Sequelize) {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
}

checkConnection(sequelize);
