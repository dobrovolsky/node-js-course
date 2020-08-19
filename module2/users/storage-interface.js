class IUserStorage {
    // eslint-disable-next-line no-unused-vars
    getByID(userID) {
        throw Error('not implemented');
    }
    // eslint-disable-next-line no-unused-vars
    create(userEntity) {
        throw Error('not implemented');
    }
    // eslint-disable-next-line no-unused-vars
    update(userEntity) {
        throw Error('not implemented');
    }
    // eslint-disable-next-line no-unused-vars
    getUsers(searchTerm, limit) {
        throw Error('not implemented');
    }
}

export default IUserStorage;
