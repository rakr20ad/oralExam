class User{
    constructor(req) {
        this.id = req.body.id;
        this.firstName = req.body.firstName; 
        this.lastName = req.body.lastName;
        this.email = req.body.email;
        this.password = req.body.password; 
    }
}
class datingUser extends User {
    constructor(req) {
    super(req) 
        this.age = req.body.age
        this.city = req.body.city
        this.country = req.body.country
        this.gender = req.body.gender
        this.preferred_gender = req.body.preferred_gender
        this.online = 0
    }
    
}

module.exports = datingUser

