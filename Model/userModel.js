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

//Get all users - part of the matching algorithm but also admin's method for getting number of users
function getUsers(){
    return new Promise((resolve, reject) => {
        const sql = `BEGIN
                        SELECT id, firstName, lastName, email, age, city, gender, preferred_gender
                        FROM GK7.datingUser  
                    END`
        const request = new Request(sql, err => {
            if(err) {
                reject(err)
                console.log(err)
            }}) 
            let results = [];
            request.on('row', async function(columns)  {
            let result = {};
            await columns.forEach(column => {  
            result[column.metadata.colName] = column.value;          
        });results.push(result);         
        
      });request.on('doneProc', (rowCount) => {
             resolve(results) 
        });  
        connection.execSql(request)
})}
module.exports.getUsers = getUsers;

//Delete user account - both for admin and datingUser
function deleteAccount(email, password){
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM [GK7].[datingUser] where email = @email AND password = @password'
        const request = new Request(sql, (err, rowcount) => {
            if(err) {
                reject(err)
                console.log(err)
            }else if (rowcount == 0) {
                reject ({message: 'User does not exist'})
            }
        })
        request.addParameter('email', TYPES.VarChar, email)
        request.addParameter('password', TYPES.VarChar, password)
        request.on('row', (columns) => {
            resolve(columns)
        })
        connection.execSql(request)
    })
}
module.exports.deleteAccount = deleteAccount;



