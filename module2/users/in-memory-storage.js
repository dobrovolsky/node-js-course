import UserStorage from './storage';
// TODO: add filtering and don't forget about isDeleted flag
class InMemoryStorage extends UserStorage {
    constructor() {
        super();
        this._data = {};
        this._loginIndex = {};
    }

    _updateLoginIndex(userEntity) {
        this._loginIndex[userEntity.login] = userEntity.id;
    }

    create(userEntity) {
        this._data[userEntity.id] = userEntity;
        this._updateLoginIndex(userEntity);
        return userEntity;
    }

    update(userEntity) {
        this._data[userEntity.id] = userEntity;
        this._updateLoginIndex(userEntity);
    }

    getByID(userID) {
        return this._data[userID];
    }

    getUsers(searchTerm = '', limit = 10) {
        let includedElements = Object.keys(this._loginIndex);
        if (searchTerm && searchTerm !== '') {
            includedElements = includedElements.filter(item => item.includes(searchTerm));
        }
        const includedElementsSet = new Set(includedElements.map(item => this._loginIndex[item]));
        const userList = Object.entries(this._data).map(item => item[1]);
        return userList.filter(item => includedElementsSet.has(item.id)).slice(0, limit);
    }
}

export default InMemoryStorage;
