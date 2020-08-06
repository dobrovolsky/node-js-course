import UserStorage from './storage';

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
    // eslint-disable-next-line no-unused-vars
    getAutoSuggestUsers(searchTerm, limit) {
        // TODO: add filtering
        return this._data;
    }
}

export default InMemoryStorage;