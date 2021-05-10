const { Connection, Request, TYPES } = require('tedious'); 
const config = require('../database/config.json'); 

//We have the like related methods below here as part of the OOM
class Like {
    constructor(req) {
        this.id = req.body.id,
        this.sender_id = req.body.sender_id,
        this.receiver_id = req.body.receiver_id
    }
}

module.exports = Like

//Connect to DB
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

//Like user by ID. sender_id is generated from localStorage, receiver_id is typed in in frontend
function likeUser(like) {
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
            resolve('Like inserted', row)
            console.log('like inserted')
       // checkMatch()
    });
         
        connection.execSql(request);
   });
}
module.exports.likeUser = likeUser;
