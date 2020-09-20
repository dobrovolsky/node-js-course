import { IGroup, IUserGroup } from "./models/interfaces";

export type groupID = string;
export type GroupCreation = Partial<IGroup>;
export type Permission = "READ" | "WRITE" | "DELETE" | "SHARE" | "UPLOAD_FILES";
