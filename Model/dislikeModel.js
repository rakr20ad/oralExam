const { Connection, Request, TYPES } = require('tedious'); 
const config = require('../database/config.json'); 

class Dislike {
    constructor(req) {
        this.id = req.body.id,
        this.dislikeSender_id = req.body.dislikeSender_id,
        this.dislikeReceiver_id = req.body.dislikeReceiver_id
    }
}

module.exports = Dislike

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


//Like user by entering their Lucky number (ID)
function dislikeUser(dislike){
    return new Promise((resolve, reject) => {
        var sql = `INSERT INTO [GK7].dislikes (dislikeSender_id, dislikeReceiver_id) VALUES (@dislikeSender_id, @dislikeReceiver_id)`
        const request = new Request(sql, (err) => {
            if (err) {
                reject(err)
                console.log(err)
            }
        });
        request.addParameter('dislikeSender_id', TYPES.Int, dislike.dislikeSender_id)
        request.addParameter('dislikeReceiver_id', TYPES.Int, dislike.dislikeReceiver_id)
        request.on('requestCompleted', (row) => {
            console.log('Dislike inserted', row); 
            resolve('Dislike inserted', row)
        });
        connection.execSql(request);
    });
}
module.exports.dislikeUser = dislikeUser;