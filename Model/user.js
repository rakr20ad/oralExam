
class User{
    constructor(firstName, lastName, email, password, age, city, country, gender, preferred_gender) {
        this.firstName = firstName; 
        this.lastName = lastName;
        this.email = email;
        this.password = password; 
        this.age = age
        this.city = city
        this.country = country
        this.gender = gender
        this.preferred_gender = preferred_gender
    }
}

module.exports = User;