class User {
    constructor({ id, full_name, email, role, created_at }) {
        this.id = id;
        this.fullName = full_name;
        this.email = email;
        this.role = role;
        this.createdAt = created_at;
    }
}

module.exports = User;