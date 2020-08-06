class User {
    constructor(id, login, password, age, isDeleted = false) {
        this.id = id;
        this.login = login;
        this.passsword = password;
        this.age = age;
        this.isDeleted = isDeleted;
    }
}


export default User;
