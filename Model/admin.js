const User = require('./user')

class admin extends User {
    constructor(req) {
        super(req)
    }
}

module.exports = admin