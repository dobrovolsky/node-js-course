import { groupID, Permission } from "../types";
import { IGroup } from "./interfaces";

class Group implements IGroup {
  id: groupID;
  name: string;
  permissions: Array<Permission>;

  constructor(id: groupID, name: string, permissions: Array<Permission> = []) {
    this.id = id;
    this.name = name;
    this.permissions = permissions;
  }
}

export default Group;
