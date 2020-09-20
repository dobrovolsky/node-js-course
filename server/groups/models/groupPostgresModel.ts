import { Optional, Model, DataTypes } from "sequelize";
import { groupID, Permission } from "../types";
import { sequelize } from "../../database";
import { IGroup, IUserGroup } from "./interfaces";
import { userID } from "../../users/types";

type GroupCreationAttributes = Optional<IGroup, "id">;

export class Group extends Model<IGroup, GroupCreationAttributes>
  implements IGroup {
  id!: groupID;
  name!: string;
  permissions!: Array<Permission>;
}

Group.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permissions: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  },
  {
    tableName: "groups",
    timestamps: false,
    sequelize, // passing the `sequelize` instance is required
  }
);

export class UserGroup extends Model<IUserGroup> implements IUserGroup {
  id!: groupID;
  user_id!: userID;
  group_id!: groupID;
}

UserGroup.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      references: {
        model: "User",
        key: "id",
      },
    },
    group_id: {
      type: DataTypes.UUID,
      references: {
        model: "Group",
        key: "id",
      },
    },
  },
  {
    tableName: "users_groups",
    timestamps: false,
    sequelize, // passing the `sequelize` instance is required
  }
);
