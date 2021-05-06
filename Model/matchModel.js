const { Connection, Request, TYPES } = require('tedious'); 
const config = require('../database/config.json'); 

class Match {
    constructor(like_id, user1, user2) {
        this.like_id = like_id,
        this.user1 = user1,
        this.user2 = user2
    }
}

module.exports = Match

