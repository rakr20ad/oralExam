class User{
    constructor(id,firstName, lastName, email, password,  city, country, gender, preferred_gender) {
        this.id = id; 
        this.firstName = firstName; 
        this.lastName = lastName;
        this.email = email;
        this.password = password; 
        //this.birthday = birthday
        this.city = city
        this.country = country
        this.gender = gender
        this.preferred_gender = preferred_gender
    }
}

module.exports = User;