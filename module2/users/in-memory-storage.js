import { NotFoundError } from './exceptions';
import IUserStorage from './storage-interface';

class InMemoryStorage extends IUserStorage {
    constructor() {
        super();
        this._data = {};
        this._loginIndex = {};
    }

    _updateLoginIndex(userEntity) {
        if (userEntity.isDeleted) {
            delete this._loginIndex[userEntity.login];
            return;
        }

        this._loginIndex[userEntity.login] = userEntity.id;
    }

    create(userEntity) {
        this._data[userEntity.id] = userEntity;
        this._updateLoginIndex(userEntity);
        return { ...userEntity };
    }

    update(userEntity) {
        const user = this.getByID(userEntity.id);
        if (user.isDeleted) {
            throw new NotFoundError();
        }

        this._data[userEntity.id] = userEntity;
        this._updateLoginIndex(userEntity);
    }

    getByID(userID) {
        const user = this._data[userID];
        if (user && user.isDeleted || !user) {
            throw new NotFoundError();
        }

        return { ...user };
    }

    getUsers(searchTerm = '', limit = 10) {
        let includedElements = Object.keys(this._loginIndex);
        if (searchTerm && searchTerm !== '') {
            includedElements = includedElements.filter(item => item.includes(searchTerm));
        }
        const includedElementsSet = new Set(includedElements.map(item => this._loginIndex[item]));
        const userList = Object.entries(this._data).map(item => item[1]);
        const userCopiedList = userList.filter(item => includedElementsSet.has(item.id)).slice(0, limit).map(user => {
            return { ...user };
        });
        return userCopiedList;
    }
}

export default InMemoryStorage;
