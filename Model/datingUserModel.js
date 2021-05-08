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
                        DECLARE @address TABLE  (id Int, country VARCHAR(3));
                        INSERT INTO GK7.datingUser(firstName, lastName, email, password, age, city, gender, preferred_gender)
                        OUTPUT inserted.id, 'Den'
                        INTO @address
                        VALUES (@firstName, @lastName, @email, @password, @age, @city, @gender, @preferred_gender)
                        INSERT INTO GK7.address (keycol, country) (
                        SELECT id, country FROM @address)
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
//This function is also triggered, when getting one's profileid, firstName, lastName, email, age, city, country, gender, preferred_gender 
function select(email, password){
    return new Promise((resolve, reject) => {
        const sql = `BEGIN
                        UPDATE GK7.datingUser
                        SET online = 1
                        OUTPUT
                        inserted.id, inserted.firstName, inserted.lastName, inserted.email, 
                        inserted.age, inserted.city, inserted.gender, inserted.preferred_gender,
                        inserted.online
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
 
//Confirm match()
//A match is inserted, when the user confirms that he want it to be a match, after knowing that both datingUsers have liked each other 
function createMatch(){
    return new Promise((resolve, reject) => {
        const sql = `BEGIN
                    INSERT INTO GK7.matches (like_id, user1, user2)
                    SELECT l1.id as like_id, l1.sender_id as user1, l1.receiver_id as user2
                    FROM GK7.likes l1, GK7.likes l2
                    WHERE (l1.sender_id = l2.receiver_id AND l2.sender_id = l1.receiver_id)
                    AND l1.id < l2.id AND l1.id NOT IN (
                        SELECT like_id FROM GK7.matches)
                    END`
                const request = new Request(sql, err => {
                    if (err) {
                        reject (err)
                        console.log(err)
                    }
                    
            });request.on('requestCompleted', (row) => {
                console.log('Match inserted', row); 
                resolve('match inserted', row)
        });
        connection.execSql(request) 
    
})}

module.exports.createMatch = createMatch

//View all matches that the logged in user has (email found in localStorage)
function getMatchById(id){
    return new Promise((resolve, reject) => {
        const sql = `BEGIN
                    SELECT u.firstName, u.lastName, l.receiver_id, l.sender_id, m.like_id
                    FROM ((GK7.likes AS l
                    INNER JOIN GK7.matches AS m ON l.id = m.like_id)
                    INNER JOIN GK7.datingUser AS u ON u.id = l.sender_id OR u.id = l.receiver_id)
                    WHERE u.id = @id
                    END`
              const request = new Request(sql, err => {
            if(err) {
                reject(err)
                console.log(err)
            }})      
            request.addParameter('id', TYPES.Int, id)
            let results = [];
            request.on('row', async function(columns)  {
            let result = {};
            await columns.forEach(column => {  
            result[column.metadata.colName] = column.value;          
        });results.push(result);         
        
      });request.on('doneProc', (rowCount) => {
             /*let recursiveFunction = function (data, like_id, start, end) {
       console.log('hej')
            // Base Condition
            if (start > end) return false;
           
            // Find the middle index
            let mid=Math.floor((start + end)/2);
            console.log('hej2')

            // Compare mid with given key x
            if (data[mid]===like_id) return true;
                  
            // If element at mid is greater than x,
            // search in the left half of mid
            if(data[mid] > like_id) 
                return recursiveFunction(data, like_id, start, mid-1);
            else
          
                // If element at mid is smaller than x,
                // search in the right half of mid
                return recursiveFunction(data, like_id, mid+1, end);
        }
        data = results
        console.log('hej3')
        recursiveFunction(data, like_id, 0, data.length-1)
        console.log("We found it")*/
    resolve(results) 
        });  
        connection.execSql(request)
})}
module.exports.getMatchById = getMatchById

//Delete a match by like_id (user sees it as Match Number)
function deleteMatch(matchNumber) {
    return new Promise((resolve, reject) => {
        const sql = `BEGIN
                        SELECT *
                        from GK7.matches as m
                        inner join GK7.likes as l on l.id = m.like_id

                        delete from  GK7.matches where like_id = @matchNumber;
                        delete from GK7.likes where id = @matchNumber
                    END`
        const request = new Request(sql, err => {
            if(err) {
                reject(err)
                console.log(err)
            }})      
            request.addParameter('matchNumber', TYPES.VarChar, matchNumber)
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
module.exports.deleteMatch = deleteMatch
