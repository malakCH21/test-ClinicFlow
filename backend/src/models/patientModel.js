class Patient {
    constructor({
        id,
        full_name,
        cin,
        phone,
        birthdate,
        address,
        created_at
    }) {
        this.id = id;
        this.fullName = full_name;
        this.cin = cin;
        this.phone = phone;
        this.birthDate = birthdate;
        this.address = address;
        this.createdAt = created_at;
    }
}

module.exports = Patient;