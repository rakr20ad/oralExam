const { Connection, Request, TYPES } = require('tedious'); 
const config = require('../database/config.json'); 
const matchModel = require('./matchModel');


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
    });
    connection.execSql(request);
});
}
module.exports.likeUser = likeUser;

//User will get notification, if it's a match
function checkMatch(sender_id, receiver_id){
    return new Promise((resolve, reject) => {
        var sql = `SELECT l1.sender_id, l1.receiver_id
                    FROM GK7.likes l1, GK7.likes l2
                    WHERE (l1.sender_id = l2.receiver_id AND l2.sender_id = l1.receiver_id)
                    AND l1.sender_id =@sender_id AND l1.receiver_id = @receiver_id`
        const request = new Request(sql, (err) => {
            if (err) {
                reject(err)
                throw(err)
            }
        });
    request.addParameter('sender_id', TYPES.Int, sender_id)
    request.addParameter('receiver_id', TYPES.Int, receiver_id)
    let results = [];
        request.on('row', async function(columns)  {
        let result = {};
        await columns.forEach(column => {  
        result[column.metadata.colName] = column.value;          
    });results.push(result);         
    
  });request.on('doneProc', (rowCount) => {
      console.log(results)
        resolve(results) 
        //createMatch()
    .catch(err)});  
    
    connection.execSql(request)
})
}
module.exports.checkMatch = checkMatch;