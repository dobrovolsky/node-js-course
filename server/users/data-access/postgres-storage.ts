import { Sequelize, Optional, Model, DataTypes, Op } from "sequelize";
import { IUser, userID, IUserStorage } from "../types";
import { NotFoundError } from "../exceptions";
import { sequelize } from "../../database";

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

class PostgreSQLStorage implements IUserStorage {
  async create(userEntity: IUser): Promise<IUser> {
    return await User.create({ ...userEntity });
  }

  async update(userEntity: IUser): Promise<IUser> {
    return await (userEntity as User).save();
  }

  async getByID(userId: userID): Promise<IUser> {
    const user = await User.findByPk(userId);

    if (!user) {
      throw new NotFoundError();
    }
    return user;
  }

  async getUsers(searchTerm = "", limit = 0): Promise<Array<IUser>> {
    if (!limit) {
      limit = 10;
    }
    let where = null;
    if (searchTerm) {
      where = Sequelize.where(
        Sequelize.fn("lower", Sequelize.col("login")),
        Op.like,
        `%${searchTerm.toLocaleLowerCase()}%`
      );
    }
    return await User.findAll({
      where: where || {},
      limit: limit,
    });
  }
}

export default PostgreSQLStorage;
