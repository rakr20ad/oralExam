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
        const sql = `BEGIN
                        DECLARE @tempCountry TABLE  (id Int);
                        insert into GK7.datingUser(firstName, lastName, email, password, age, city, gender, preferred_gender)
                        OUTPUT inserted.id
                        INTO @tempCountry
                        VALUES (@firstName, @lastName, @email, @password, @age, @city, @gender, @preferred_gender)
                        INSERT INTO GK7.country (keycol)(
                            SELECT id FROM @tempCountry)
                    END`
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
//This function is also triggered by both GET (for when getting the signedIn user's profileid, firstName, lastName, email, age, city, gender, preferred_gender)
//but also POST (for when signing in and posting information) 
function select(email, password){
    return new Promise((resolve, reject) => {
        const sql = `BEGIN
                        UPDATE GK7.datingUser
                        SET online = 1
                        OUTPUT
                        inserted.id, inserted.firstName, inserted.lastName, inserted.email, inserted.password,
                        inserted.age, inserted.city, inserted.gender, inserted.preferred_gender, inserted.online
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
module.exports.select = select;

//Logout
function logout(id) {
    return new Promise((resolve, reject) => {
         let sql = `BEGIN
                    UPDATE GK7.datingUser
                    SET online = 0
                    OUTPUT
                    inserted.id,
                    deleted.online,
                    inserted.online
                    WHERE id = @id
                    END`
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


//Filter datingUser by gender and age
function filterGender(gender){
    return new Promise((resolve, reject) => {
        const sql = `SELECT firstName, lastName, email, age, city, gender, preferred_gender, id, country
                     FROM GK7.datingUser d
                    LEFT JOIN GK7.country a on d.id = a.keycol
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
        const sql = `SELECT id, firstName, lastName, email, age, city, gender, preferred_gender
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