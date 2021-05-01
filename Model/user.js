class User{
    constructor(firstName, lastName, email, password) {
        this.firstName = firstName; 
        this.lastName = lastName;
        this.email = email;
        this.password = password; 
        
    }
}


class datingUser extends User {
    constructor(age, city, country, gender, preferred_gender, online) {
    super(firstName, lastName, email, password) 
        this.age = age
        this.city = city
        this.country = country
        this.gender = gender
        this.preferred_gender = preferred_gender
        this.online = online
    }
    get age() {
        return this.age
    }
    get online() {
        return this.online
    }
    set age(age) {
        return this.age = age
    }
    set online(bool) {
        this.online = bool
    }
}

module.exports = User;