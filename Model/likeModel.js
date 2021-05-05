const { Connection, Request, TYPES } = require('tedious'); 
const config = require('../database/config.json'); 


class Like {
    constructor(req) {
        this.id = req.body.id,
        this.sender_id = req.body.sender_id,
        this.receiver_id = req.body.receiver_id
    }
}

module.exports = Like

var connection = new Connection(config); 

function startDB(){
    return new Promise((resolve, reject) => {
        connection.on('connect', (err) => {
            if (err) {
                console.log('Connection failed')
                reject(err)
                throw err;
            } else {
                console.log('Connected')
                //createMatch()
                resolve();
            }
        })
        connection.connect();
    }) 
}
module.exports.sqlConnection = connection; 
module.exports.startDB = startDB;

//Like user by entering your ID and the interesting user's ID
function likeUser(like){
    return new Promise((resolve, reject) => {
        var sql = `INSERT INTO [GK7].likes (sender_id, receiver_id) VALUES (@sender_id, @receiver_id)`
        const request = new Request(sql, (err) => {
            if (err) {
                reject(err)
                console.log(err)
            }
        });
        request.addParameter('sender_id', TYPES.Int, like.sender_id)
        request.addParameter('receiver_id', TYPES.Int, like.receiver_id)
        request.on('requestCompleted', (row) => {
            console.log('Like inserted', row); 
            resolve('Like inserted', row)
            checkMatch()
        });
        connection.execSql(request);
    });
}
module.exports.likeUser = likeUser;

//catch user skal skrives her: 
    function checkMatch(){
    return new Promise((resolve, reject) => {
        var sql = `SELECT l1.id as like_id, l1.sender_id as user1, l1.receiver_id as user2
        FROM GK7.likes l1, GK7.likes l2
        WHERE (l1.sender_id = l2.receiver_id AND l2.sender_id = l1.receiver_id)`
        const request = new Request(sql, (err) => {
            if (err) {
                reject(err)
                console.log(err)
            }
        });
        request.addParameter('sender_id', TYPES.Int, like.sender_id)
        request.addParameter('receiver_id', TYPES.Int, like.receiver_id)
        request.on('requestCompleted', (row) => {
            console.log('Like inserted', row); 
            resolve('Like inserted', row)
        });
        connection.execSql(request);
    });
}
module.exports.checkMatch = checkMatch;