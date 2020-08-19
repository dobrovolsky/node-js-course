import { NotFoundError } from "./exceptions";
import IUserStorage from "./storage-interface";
import _ from "lodash";
import { IUser, userID } from "./types";

class InMemoryStorage implements IUserStorage {
  private readonly data: Record<string, IUser>;

  constructor() {
    this.data = {};
  }

  create(userEntity: IUser): IUser {
    this.data[userEntity.id] = userEntity;
    return { ...userEntity };
  }

  update(userEntity: IUser): IUser {
    const user = this.getByID(userEntity.id);
    if (user.isDeleted) {
      throw new NotFoundError();
    }

    this.data[userEntity.id] = userEntity;
    return userEntity;
  }

  getByID(userId: userID): IUser {
    const user = this.data[userId];
    if ((user && user.isDeleted) || !user) {
      throw new NotFoundError();
    }

    return { ...user };
  }

  getUsers(searchTerm = "", limit = 10): Array<IUser> {
    const useSearch = searchTerm && searchTerm !== "";

    const filteredData = _.filter(this.data, (item: IUser) => {
      let matched = true;
      if (useSearch) {
        matched = item.login
          .toLocaleLowerCase()
          .includes(searchTerm.toLocaleLowerCase());
      }
      return !item.isDeleted && matched;
    });

    return filteredData.slice(0, limit || 10).map((user: IUser) => {
      return { ...user };
    });
  }
}

export default InMemoryStorage;
