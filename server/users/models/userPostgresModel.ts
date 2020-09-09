import { Optional, Model, DataTypes } from "sequelize";
import { userID } from "../types";
import { sequelize } from "../../database";
import { IUser } from "./interfaces";

type UserCreationAttributes = Optional<IUser, "id">;

class User extends Model<IUser, UserCreationAttributes> implements IUser {
  id!: userID;
  login!: string;
  password!: string;
  isDeleted!: boolean;
  age!: number;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: "is_deleted",
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: false,
    sequelize, // passing the `sequelize` instance is required
  }
);

export default User;
