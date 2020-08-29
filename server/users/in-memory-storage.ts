import { NotFoundError } from "./exceptions";
import _ from "lodash";
import { IUser, userID, IUserStorage } from "./types";

class InMemoryStorage implements IUserStorage {
  private readonly data: Record<string, IUser>;

  constructor() {
    this.data = {};
  }

  async create(userEntity: IUser): Promise<IUser> {
    this.data[userEntity.id] = userEntity;
    return { ...userEntity };
  }

  async update(userEntity: IUser): Promise<IUser> {
    const user = await this.getByID(userEntity.id);
    if (user.isDeleted) {
      throw new NotFoundError();
    }

    this.data[userEntity.id] = userEntity;
    return userEntity;
  }

  async getByID(userId: userID): Promise<IUser> {
    const user = this.data[userId];
    if ((user && user.isDeleted) || !user) {
      throw new NotFoundError();
    }

    return { ...user };
  }

  async getUsers(searchTerm = "", limit = 10): Promise<Array<IUser>> {
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
