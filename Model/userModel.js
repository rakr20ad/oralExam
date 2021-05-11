const { Connection, Request, TYPES } = require('tedious'); 
const config = require('../database/config.json'); 
//both admin and datingUser methods here (nedarvning)

class User{
    constructor(req) {
        this.id = (req.query.id || req.body && req.body.id);
        this.firstName = (req.query.firstName || req.body && req.body.firstName); 
        this.lastName = (req.query.lastName || req.body && req.body.lastName);
        this.email = (req.query.email || req.body && req.body.email);
        this.password = (req.query.password || req.body && req.body.password);
        this.online = (req.query.online || req.body && req.body.online);
    }
    
}
module.exports = User

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

//Both Admin and datingUser can update a user's password
function updateUser(email, password) {
    return new Promise((resolve, reject) => {
         let sql = `UPDATE [GK7].[datingUser] SET password = @password
         WHERE email = @email`
         let request = new Request(sql, (err) => {
         if (err) {
            reject(err);}
        });
        request.addParameter('email', TYPES.VarChar, email);
        request.addParameter('password', TYPES.VarChar, password);
        
        request.on('requestCompleted', (row) => {
            resolve ('User updated', row)
            console.log('row')
       
        });

        connection.execSql(request);
    })
};
module.exports.updateUser = updateUser;


//Delete user account - both for admin and datingUser
function deleteAccount(id){
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM GK7.datingUser AS u
                    INNER JOIN GK7.country AS c ON c.keycol = u.id
                    INNER JOIN GK7.dislikes d ON u.id = d.dislikeReceiver_id OR u.id = dislikeSender_id
                    INNER JOIN GK7.likes l ON u.id = l.receiver_id OR u.id = l.sender_id
                    INNER JOIN GK7.matches m ON u.id = m.user1 OR u.id = m.user2
                    
                    DELETE FROM GK7.country WHERE keycol = @id
                    DELETE FROM GK7.matches WHERE user2 = @id OR user1 = @id
                    DELETE FROM GK7.likes WHERE sender_id = @id OR receiver_id= @id
                    DELETE FROM GK7.dislikes WHERE dislikeReceiver_id = @id OR dislikeSender_id = @id
                    DELETE FROM  GK7.datingUser WHERE id =  @id;
                    `
        const request = new Request(sql, (err, rowcount) => {
            if(err) {
                reject(err)
                console.log(err)
            }else if (rowcount == 0) {
                reject ({message: 'User does not exist'})
            }
        })
        request.addParameter('id', TYPES.Int, id)
        request.on('row', (columns) => {
            resolve(columns)
        })
        connection.execSql(request)
    })
}
module.exports.deleteAccount = deleteAccount;



