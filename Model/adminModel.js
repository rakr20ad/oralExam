const User = require('./userModel')
const { Connection, Request, TYPES } = require('tedious'); 
const config = require('../database/config.json'); 

//admin related methods in here

class Admin extends User {
    constructor(req) {
        super(req)
    }
}
module.exports = Admin

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

//Admin create account
function insertAdmin(admin){
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO [GK7].[admin] (firstName, lastName, email, password) VALUES (@firstName, @lastName, @email, @password)`
        const request = new Request(sql, (err) => {
            if (err) {
                reject(err)
                console.log(err)
            }
        });
        request.addParameter('firstName', TYPES.VarChar, admin.firstName)
        request.addParameter('lastName', TYPES.VarChar, admin.lastName)
        request.addParameter('email', TYPES.VarChar, admin.email)
        request.addParameter('password', TYPES.VarChar, admin.password)
       
        request.on('requestCompleted', (row) => {
            console.log('User inserted', row); 
            resolve('user inserted', row)
        });
        connection.execSql(request);
    });
}
module.exports.insertAdmin = insertAdmin;

//Admin login
function selectAdmin(email, password){
    return new Promise((resolve, reject) => {
        const sql = `BEGIN
                        UPDATE GK7.admin
                        SET online = 1
                        OUTPUT
                        inserted.id, inserted.email, inserted.password, inserted.online
                        WHERE email = @email AND password = @password
                    END`
        const request = new Request(sql, err => {
            if(err) {
                reject(err)
                console.log(err)
            }})      
            request.addParameter('email', TYPES.VarChar, email)
            request.addParameter('password', TYPES.VarChar, password)
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
module.exports.selectAdmin = selectAdmin;

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

//Private method
//For the admin to get all matches 
function getAllMatches() {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM GK7.matches`
        let request = new Request(sql, err => {
          if (err) {
            reject(err);
          }
        });
        const results = [];
        request.on('row', columns => {
          let result = {};
          columns.forEach(column => {
            result[column.metadata.colName] = column.value;
          });
  
          results.push(result);
        });
  
        request.on('doneProc', (rowCount) => {
          resolve(results);
        });
 
    connection.execSql(request);
})}
module.exports.getAllMatches = getAllMatches;

//Logout
function logoutAdmin(id) {
    return new Promise((resolve, reject) => {
         let sql = `SELECT id, online FROM [GK7].[admin] WHERE id = @id`
         let request = new Request(sql, (err) => {
         if (err) {
            reject(err);
            console.log(err);
            }
        });
        request.addParameter('id', TYPES.Int, id);
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
    })
}
module.exports.logoutAdmin = logoutAdmin;



