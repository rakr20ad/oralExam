const User = require('./user')

class admin extends User{
    constructor(id,first_name, last_name, email, hashed_password, birthday, city, country, gender, preferred_gender) {
        this.id = id; 
        this.first_name = first_name; 
        this.last_name = last_name;
        this.email = email;
        this.hashed_password = hashed_password; 
        this.city = city
        this.country = country
//        this.users = users
    }
}

module.exports = admin;