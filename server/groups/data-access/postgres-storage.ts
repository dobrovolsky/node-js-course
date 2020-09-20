import { IGroupStorage } from "./interfaces";
import { IGroup, IUserGroup } from "../models/interfaces";
import { NotFoundError } from "../../shared/exceptions";
import { Group, UserGroup } from "../models/groupPostgresModel";
import { groupID } from "../types";
import { Transaction } from "sequelize";

class PostgreSQLStorage implements IGroupStorage {
  async create(entity: IGroup): Promise<IGroup> {
    return await Group.create({ ...entity });
  }

  async update(entity: IGroup): Promise<IGroup> {
    return await (entity as Group).save();
  }

  async delete(entity: IGroup): Promise<void> {
    return await (entity as Group).destroy();
  }

  async getByID(id: groupID): Promise<IGroup> {
    const group = await Group.findByPk(id);

    if (!group) {
      throw new NotFoundError();
    }
    return group;
  }

  async getAll(limit = 0): Promise<Array<IGroup>> {
    if (!limit) {
      limit = 10;
    }
    return await Group.findAll({
      limit: limit,
    });
  }

  async addUsersToGroup(
    entities: Array<IUserGroup>,
    transtaction: Transaction
  ): Promise<Array<IUserGroup>> {
    return await UserGroup.bulkCreate(entities, { transaction: transtaction });
  }
}

export default PostgreSQLStorage;
