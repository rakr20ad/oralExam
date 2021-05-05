const { Connection, Request, TYPES } = require('tedious'); 
const config = require('../database/config.json'); 

class Match {
    constructor(like_id, user1, user2) {
        this.like_id = like_id,
        this.user1 = user1,
        this.user2 = user2
    }
}

module.exports = Match
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


         
//A match is inserted, if both datingUser have liked each other
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