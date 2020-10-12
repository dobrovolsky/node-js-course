import { Sequelize, Op } from "sequelize";
import { userID } from "../types";
import { IUserStorage } from "./interfaces";
import User from "../models/userPostgresModel";
import { IUser } from "..";
import { NotFoundError } from "../../shared/exceptions";

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

  async getByLoginPassword(login: string, password: string): Promise<IUser> {
    const user = await User.findOne({
      where: {
        [Op.and]: [{ login: login }, { password: password }],
      },
    });

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
