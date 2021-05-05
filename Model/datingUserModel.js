const { Connection, Request, TYPES } = require('tedious'); 
const config = require('../database/config.json'); 
const User = require('./userModel')

class datingUser extends User {
    constructor(req) {
    super(req) 
        this.age = (req.query.age || req.body && req.body.age);
        this.city = (req.query.city || req.body && req.body.city);
        this.country = (req.query.country || req.body && req.body.country);
        this.gender = (req.query.gender || req.body && req.body.gender);
        this.preferred_gender = (req.query.preferred_gender || req.body && req.body.preferred_gender);
    }
    
}
module.exports = datingUser

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

//A user creates an account, when his information is posted to the database
function insert(datingUser){
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO [GK7].[datingUser] (firstName, lastName, email, password, age, city, country, gender, preferred_gender)
         VALUES (@firstName, @lastName, @email, @password, @age, @city, @country, @gender, @preferred_gender)`
        const request = new Request(sql, (err) => {
            if (err) {
                reject(err)
                console.log(err)
            }
        });
        request.addParameter('firstName', TYPES.VarChar, datingUser.firstName)
        request.addParameter('lastName', TYPES.VarChar, datingUser.lastName)
        request.addParameter('email', TYPES.VarChar, datingUser.email)
        request.addParameter('password', TYPES.VarChar, datingUser.password)
        request.addParameter('age', TYPES.Int, datingUser.age)
        request.addParameter('city', TYPES.VarChar, datingUser.city)        
        request.addParameter('country', TYPES.VarChar, datingUser.country)        
        request.addParameter('gender', TYPES.VarChar, datingUser.gender)
        request.addParameter('preferred_gender', TYPES.VarChar, datingUser.preferred_gender)
        request.on('requestCompleted', (row) => {
            console.log('User inserted', row); 
            resolve('user inserted', row)
        });

        connection.execSql(request);
    });

}       
module.exports.insert = insert;

// A user signs in, and SQL finds if his information exists in database. 
//This function is also triggered, when getting one's profileid, firstName, lastName, email, age, city, country, gender, preferred_gender 
function select(email, password){
    return new Promise((resolve, reject) => {
        const sql = `SELECT id, firstName, lastName, email, password, age, city, country, gender, preferred_gender, online
                    FROM [GK7].[datingUser]  
                    WHERE email = @email AND password = @password`
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
module.exports.select = select;

//Logout
function logout(id) {
    return new Promise((resolve, reject) => {
         let sql = `SELECT id, online FROM [GK7].[datingUser] WHERE id = @id`
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
module.exports.logout = logout;

//update an user
function update(age, email, password) {
    return new Promise((resolve, reject) => {
         let sql = `UPDATE [GK7].[datingUser] SET age = @age
         WHERE email = @email AND password = @password`
         let request = new Request(sql, (err) => {
         if (err) {
            reject(err);}
        });
        request.addParameter('age', TYPES.Int, age);
        request.addParameter('email', TYPES.VarChar, email);
        request.addParameter('password', TYPES.VarChar, password);
        request.on('requestCompleted', (row) => {
            resolve ('User updated', row)
            console.log('row')
       
        });

        connection.execSql(request);
    })
};
module.exports.update = update;

//GetFullUser based on city - may be used when finding a match
function getUsersNearby(id){
    return new Promise((resolve, reject) => {
        const sql = `BEGIN
        SELECT id, firstName, lastName, email, age, city, country, gender, preferred_gender
        FROM GK7.datingUser 
    END`
        const request = new Request(sql, err => {
            if(err) {
                reject(err)
                console.log(err)
            }})      
            request.addParameter('id', TYPES.VarChar, id)
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
module.exports.getUsersNearby = getUsersNearby;

//Filter datingUser by gender and age
function filterGender(gender){
    return new Promise((resolve, reject) => {
        const sql = `SELECT id, firstName, lastName, email, age, city, country, gender, preferred_gender, online 
                    FROM [GK7].[datingUser] 
                    WHERE gender = @gender`
        const request = new Request(sql, err => {
            if(err) {
                reject(err)
                console.log(err)
            }})      
            request.addParameter('gender', TYPES.VarChar, gender)
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
module.exports.filterGender = filterGender;

//Filter datingUser by age
function filterAge(minAge, maxAge){
    return new Promise((resolve, reject) => {
        const sql = `SELECT id, firstName, lastName, email, age, city, country, gender, preferred_gender, online 
                    FROM [GK7].[datingUser] 
                    WHERE age >= @minAge AND age <= @maxAge`
        const request = new Request(sql, err => {
            if(err) {
                reject(err)
                console.log(err)
            }})      
            request.addParameter('minAge', TYPES.VarChar, minAge)
            request.addParameter('maxAge', TYPES.VarChar, maxAge)
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
module.exports.filterAge = filterAge;



