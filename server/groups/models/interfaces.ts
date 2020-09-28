import { groupID, Permission } from "../types";
import { userID } from "../../users/types";

export interface IGroup {
  id: groupID;
  name: string;
  permissions: Array<Permission>;
}

export interface IUserGroup {
  id: groupID;
  user_id: userID;
  group_id: groupID;
}
