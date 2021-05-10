
const { Connection, Request, TYPES } = require('tedious'); 
const config = require('../database/config.json'); 

//Match related mathods here

class Match {
    constructor(like_id, user1, user2) {
        this.like_id = like_id,
        this.user1 = user1,
        this.user2 = user2
    }
}

module.exports = Match

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

//User will get notification, if it's a match
function checkMatch(sender_id, receiver_id){
    return new Promise((resolve, reject) => {
        var sql = `SELECT l1.sender_id, l1.receiver_id
                    FROM GK7.likes l1, GK7.likes l2
                    WHERE (l1.sender_id = l2.receiver_id AND l2.sender_id = l1.receiver_id)
                    AND l1.sender_id = @sender_id AND l1.receiver_id = @receiver_id`
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
            createMatch()
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
                    SELECT user1, user2, like_id
                    FROM GK7.matches 
                    WHERE user1 = @id OR user2 = @id
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
    resolve(results) 
        });  
        connection.execSql(request)
})}
module.exports.getMatchById = getMatchById

//Delete a match by like_id (user sees it as Match Number)
function deleteMatch(like_id) {
    return new Promise((resolve, reject) => {
        const sql = `BEGIN
                        SELECT *
                        from GK7.matches as m
                        inner join GK7.likes as l on l.id = m.like_id

                        delete from  GK7.matches where like_id = @like_id;
                        delete from GK7.likes where id = @like_id
                    END`
        const request = new Request(sql, err => {
            if(err) {
                reject(err)
                console.log(err)
            }})      
            request.addParameter('like_id', TYPES.Int, like_id)
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
