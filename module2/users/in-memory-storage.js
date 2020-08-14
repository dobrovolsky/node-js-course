import { NotFoundError } from './exceptions';
import IUserStorage from './storage-interface';
import _ from 'lodash';

class InMemoryStorage extends IUserStorage {
    constructor() {
        super();
        this._data = {};
    }

    create(userEntity) {
        this._data[userEntity.id] = userEntity;
        return { ...userEntity };
    }

    update(userEntity) {
        const user = this.getByID(userEntity.id);
        if (user.isDeleted) {
            throw new NotFoundError();
        }

        this._data[userEntity.id] = userEntity;
    }

    getByID(userID) {
        const user = this._data[userID];
        if (user && user.isDeleted || !user) {
            throw new NotFoundError();
        }

        return { ...user };
    }

    getUsers(searchTerm = '', limit = 10) {
        const useSearch = searchTerm && searchTerm !== '';

        const filteredData = _.filter(this._data, item => {
            let matched = true;
            if (useSearch) {
                matched = item.login.includes(searchTerm);
            }
            return !item.isDeleted && matched;
        });

        return filteredData.slice(0, limit).map(user => {
            return { ...user };
        });
    }
}

export default InMemoryStorage;
