import { GroupCreation, groupID } from "../types";
import { IGroup, IUserGroup } from "../models/interfaces";
import { Transaction } from "sequelize";

export interface IGroupStorage {
  getByID(id: groupID): Promise<IGroup>;
  create(entity: GroupCreation): Promise<IGroup>;
  update(entity: GroupCreation): Promise<IGroup>;
  delete(entity: GroupCreation): Promise<void>;
  getAll(limit: number): Promise<Array<IGroup>>;
  addUsersToGroup(
    entities: Array<IUserGroup>,
    transaction: Transaction
  ): Promise<Array<IUserGroup>>;
}
