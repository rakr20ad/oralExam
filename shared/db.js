
const { Connection, Request, TYPES } = require('tedious'); 
const config = require('./config.json'); 
const datingUser = require('../Model/user')
const admin = require('../Model/user')

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
        const sql = `INSERT INTO [GK7].[users] (firstName, lastName, email, password, age, city, country, gender, preferred_gender) VALUES (@firstName, @lastName, @email, @password, @age, @city, @country, @gender, @preferred_gender)`
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

//
function selectFirstname(firstName){
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM [GK7].[users] where firstName = @firstName'
        const request = new Request(sql, (err, rowcount) => {
            if(err) {
                reject(err)
                console.log(err)
            }else if (rowcount == 0) {
                reject ({message: 'User does not exist'})
            }
        })
        request.addParameter('firstName', TYPES.VarChar, firstName)
        request.on('row', (columns) => {
            resolve(columns)
        })
        connection.execSql(request)
    })
}
module.exports.selectFirstname = selectFirstname;

// A user signs in, and SQL finds if his information exists in database. 
//This function is also triggered, when getting one's profile
function select(email, password){
    return new Promise((resolve, reject) => {
        const sql = `SELECT firstName, lastName, age, city, id FROM [GK7].[users] WHERE email = @email AND password = @password`
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


//Delete user account
function deleteUser(email, password){
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM [GK7].[users] where email = @email AND password = @password'
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
module.exports.deleteUser = deleteUser;

//update an user
function update(age, email, password) {
    return new Promise((resolve, reject) => {
         let sql = `UPDATE [GK7].[users] SET age = @age
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
function getUsersNearby(email){
    return new Promise((resolve, reject) => {
        const sql = `BEGIN
                        SELECT A.firstName, A.lastName, A.age, A.id, B.firstName, B.lastName, B.age, B.id
                        FROM GK7.users A, GK7.users B
                        WHERE A.id <> B.id
                        AND A.city = B.city
                        AND A.email = @email
                    END`
        const request = new Request(sql, err => {
            if(err) {
                reject(err)
                console.log(err)
            }})      
            request.addParameter('email', TYPES.VarChar, email)
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

//Filter users by gender and age
function filterGender(gender){
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM [GK7].[users] WHERE gender = @gender`
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

//Filter users by age
function filterAge(minAge, maxAge){
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM [GK7].[users] WHERE age >= @minAge AND age <= @maxAge`
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

function getProfile(id){
    return new Promise((resolve, reject) => {
        const sql = `BEGIN
                        SELECT id, firstName, lastName, email, age, city, country, gender, preffered_gender
                        FROM [GK7].[users]
                        WHERE id = @id
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
module.exports.getProfile = getProfile
//Like user by entering your ID and the interesting user's ID
function likeUser(sender_id, receiver_id){
    return new Promise((resolve, reject) => {
        var sql = `INSERT INTO [GK7].likes (sender_id, receiver_id) VALUES (@sender_id, @receiver_id)`
        const request = new Request(sql, (err) => {
            if (err) {
                reject(err)
                console.log(err)
            }
        });
        request.addParameter('sender_id', TYPES.VarChar, sender_id)
        request.addParameter('receiver_id', TYPES.VarChar, receiver_id)
        request.on('requestCompleted', (row) => {
            console.log('Like inserted', row); 
            resolve('Like inserted', row)
        });
        connection.execSql(request);
    });
}
module.exports.likeUser = likeUser;

//Like user by entering your ID and the interesting user's ID
function dislikeUser(dislikeSender_id, dislikeReceiver_id){
    return new Promise((resolve, reject) => {
        var sql = `INSERT INTO [GK7].dislikes (dislikeSender_id, dislikeReceiver_id) VALUES (@dislikeSender_id, @dislikeReceiver_id)`
        const request = new Request(sql, (err) => {
            if (err) {
                reject(err)
                console.log(err)
            }
        });
        request.addParameter('dislikeSender_id', TYPES.VarChar, dislikeSender_id)
        request.addParameter('dislikeReceiver_id', TYPES.VarChar, dislikeReceiver_id)
        request.on('requestCompleted', (row) => {
            console.log('Dislike inserted', row); 
            resolve('Dislike inserted', row)
        });
        connection.execSql(request);
    });
}
module.exports.dislikeUser = dislikeUser;

//A match is inserted, if both users have liked each other
function createMatch(){
    return new Promise((resolve, reject) => {
        const sql = `BEGIN
                    INSERT INTO GK7.matches (like_id, user1, user2)
                    SELECT l1.id, l1.sender_id, l1.receiver_id
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
function getMyMatches(id){
    return new Promise((resolve, reject) => {
        const sql = `BEGIN
                        SELECT u.firstName, u.lastName, l.receiver_id, l.sender_id, u.email, l.id, m.like_id
                        FROM ((GK7.likes AS l
                        INNER JOIN GK7.matches AS m ON l.id = m.like_id)
                        INNER JOIN GK7.users AS u ON u.id = l.sender_id OR u.id = l.receiver_id)
                        WHERE u.id = @id
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
module.exports.getMyMatches = getMyMatches

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

//---------------------------ADMINISTRATOR FUNCTIONALITIES BELOW----------------------------------

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
        const sql = 'SELECT * FROM [GK7].[admin] WHERE email = @email AND password = @password'
        const request = new Request(sql, err => {
            if(err) {
                reject(err)
                console.log(err)
            }
            })
        request.addParameter('email', TYPES.VarChar, email)
        request.addParameter('password', TYPES.VarChar, password)
        request.on("row", (coloumns) => {
            console.log('Admin logged in'); 
            resolve(coloumns)
        });
        connection.execSql(request);
    });
}
module.exports.selectAdmin = selectAdmin;

//For the admin to view all users 
function viewAllUsers() {
    return new Promise((resolve, reject) => {
        const sql = `DECLARE @json NVARCHAR(Max)
        SET @json = (SELECT * FROM [GK7].[users] FOR JSON PATH, ROOT('data'))
        SELECT value
        FROM OPENJSON(@json,'$.data')`
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
module.exports.viewAllUsers = viewAllUsers;

//Admin can reset a user's password
function updateUser(password, email) {
    return new Promise((resolve, reject) => {
         let sql = `UPDATE [GK7].[users] SET password = @password
         WHERE email = @email`
         let request = new Request(sql, (err) => {
         if (err) {
            reject(err);}
        });
        request.addParameter('password', TYPES.VarChar, password);
        request.addParameter('email', TYPES.VarChar, email);
        request.on('requestCompleted', (row) => {
            resolve ('User updated', row)
            console.log('row')
       
        });

        connection.execSql(request);
    })
};
module.exports.updateUser = updateUser;


    // Create query to execute against the database
/*const queryText = `SELECT * FROM [GK7].[users]` //+ (payload[0] != undefined ? " WHERE Color IN ('" + payload[0] + "')" : "") + " GROUP BY Color ORDER BY cnt;";
    //console.log(queryText);
    request = new Request(queryText, function(err) {
        if (err) {
            // Error in executing query
            console.log(err);
        } 
    })            
    
        let rowData = {}
        let result = []
    // Manipulate the results and create JSON
    request.on('row', function (columns) {

        columns.forEach(function (column) {
            // IMPORTANT: Change the conversion logic here to adjust the JSON format
            //console.log(column)//
            rowData = column
        });
        result.push(rowData);
        connection.execSql(request) 
        return result
    })
    /*;request = new Request('SELECT * FROM [GK7].[users] as Users', function(err) {
            if(err) {
                console.log(err)
            }
        })
        var counter = 1
        var message = {}
        request.on('row', function (columns){
            message[counter] = {}
            columns.forEach(function(column) {
                console.log(column)
               message[column.metadata.colName]= column.value
            })
           counter += 1
        })
        return message 
   }*/

   


//DELE AF UPDATE INSPO
// Create array to store the query results

    
    // Create Request object
    
/*
    var _currentData = {};

    function updateUser() {

        request = new Request("SELECT *'firstName' = firstName FROM RunnerPerformance;", function(err) {
        if (err) {
            context.log(err);}
        });

        request.on('row', function(columns) {
            _currentData.Best = columns[0].value;
            _currentData.Average = columns[1].value;;
            context.log(_currentData);
        });

        request.on('requestCompleted', function () {
            saveStatistic();
        });
        connection.execSql(request);
    }


    function saveStatistic() {

        request = new Request("UPDATE Statistic SET BestTime=@best, AverageTime=@average;", function(err) {
         if (err) {
            context.log(err);}
        });
        request.addParameter('best', TYPES.VarChar, _currentData.Best);
        request.addParameter('average', TYPES.VarChar, _currentData.Average);
        request.on('row', function(columns) {
            columns.forEach(function(column) {
              if (column.value === null) {
                context.log('NULL');
              } else {
                context.log("Statistic Updated.");
              }
            });
        });

        connection.execSql(request);
    }

    context.done();
};

module.exports.viewAllUsers = viewAllUsers;*/