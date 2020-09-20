import { v4 as uuidv4 } from "uuid";
import { groupID, Permission } from "../types";
import PostgreSQLStorage from "../data-access/postgres-storage";
import { IGroupStorage } from "../data-access/interfaces";
import { IGroup } from "../models/interfaces";
import Group from "../models/groupModel";
import { userID } from "../../users/types";
import { sequelize } from "../../database";

const storage = new PostgreSQLStorage();

class GroupService {
  private storage: IGroupStorage;

  constructor(storage: IGroupStorage) {
    this.storage = storage;
  }

  async create(name: string, permissions: Array<Permission>): Promise<IGroup> {
    const entity = new Group(uuidv4(), name, permissions);
    return await this.storage.create(entity);
  }

  async delete(entity: IGroup): Promise<void> {
    return await this.storage.delete(entity);
  }

  async update(entity: IGroup): Promise<IGroup> {
    return await this.storage.update(entity);
  }

  async getByID(id: groupID): Promise<IGroup> {
    return await this.storage.getByID(id);
  }

  async getAll(limit: number): Promise<Array<IGroup>> {
    return await this.storage.getAll(limit);
  }
  async addUsersToGroup(
    groupId: groupID,
    userIds: Array<userID>
  ): Promise<void> {
    const t = await sequelize.transaction();
    const userGroups = userIds.map((item) => {
      return {
        id: uuidv4(),
        user_id: item,
        group_id: groupId,
      };
    });
    try {
      await this.storage.addUsersToGroup(userGroups, t);
      await t.commit();
    } catch (error) {
      await t.rollback();
    }
  }
}

export const groupService = new GroupService(storage);
