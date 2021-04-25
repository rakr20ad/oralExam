const { request } = require('chai');
const { Connection, Request, TYPES } = require('tedious'); 
const config = require('./config.json'); 

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
                //viewAllUsers()
                resolve();
            }
        })
        connection.connect();
    }) 
}
module.exports.sqlConnection = connection; 
module.exports.startDB = startDB;

//Tilhører CreateUser funktionen
function insert(payload){
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO [GK7].[users] (name, email, gender, country, birthday, image) VALUES (@name, @email, @gender, @country, @birthday, @image)`
        const request = new Request(sql, (err) => {
            if (err) {
                reject(err)
                console.log(err)
            }
        });
        request.addParameter('name', TYPES.VarChar, payload.name)
        request.addParameter('email', TYPES.VarChar, payload.email)
        request.addParameter('gender', TYPES.VarChar, payload.gender)
        request.addParameter('country', TYPES.VarChar, payload.country)
        request.addParameter('birthday', TYPES.Date, payload.birthday)
        request.addParameter('image', TYPES.VarChar, payload.image)

        request.on('requestCompleted', (row) => {
            console.log('User inserted', row); 
            resolve('user inserted', row)
        });
        connection.execSql(request);
    });
}
module.exports.insert = insert;

//Tilhører GetUser funktionen
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

//Tilhører Login funktionen - samme som ovenstående syntaks
//Rasmus: Jeg aner ikke, hvilken sql function, man skal vælge her????? 
//Men tænker at dette er noget, vi kan bygge videre på.. 
function select(email, password){
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM [GK7].[users] where email = @email AND password = @password`
        const request = new Request(sql, err => {
            if(err) {
                reject(err)
                console.log(err)
            }})      
            request.addParameter('email', TYPES.VarChar, email)
            request.addParameter('password', TYPES.VarChar, password)
            /*let results = [];
            request.on('row', async function(columns)  {
            let result = {};
            await columns.forEach(column => {  
            result[column.metadata.colName] = column.value;          
        });results.push(result);         
        
      });request.on('doneProc', (rowCount) => {
             resolve(results) 
        });  */
        request.on('row', (columns) => {
            resolve(columns)
        })
        connection.execSql(request)
})}
module.exports.select = select;

function insert(user){
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO [GK7].[users] (firstName, lastName, email, password, age, city, country, gender, preferred_gender) VALUES (@firstName, @lastName, @email, @password, @age, @city, @country, @gender, @preferred_gender)`
        const request = new Request(sql, (err) => {
            if (err) {
                reject(err)
                console.log(err)
            }
        });
        request.addParameter('firstName', TYPES.VarChar, user.firstName)
        request.addParameter('lastName', TYPES.VarChar, user.lastName)
        request.addParameter('email', TYPES.VarChar, user.email)
        request.addParameter('password', TYPES.VarChar, user.password)
        request.addParameter('age', TYPES.Int, user.age)
        request.addParameter('city', TYPES.VarChar, user.city)        
        request.addParameter('country', TYPES.VarChar, user.country)        
        request.addParameter('gender', TYPES.VarChar, user.gender)
        request.addParameter('preferred_gender', TYPES.VarChar, user.preferred_gender)

        request.on('requestCompleted', (row) => {
            console.log('User inserted', row); 
            resolve('user inserted', row)
        });
        connection.execSql(request);
    });
}
module.exports.insert = insert;

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

function filterAge(minAge, maxAge){
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM [GK7].[users] WHERE age >= @minAge AND age <= @maxAge`
        const request = new Request(sql, err => {
            if(err) {
                reject(err)
                console.log(err)
            }})      
            request.addParameter('minAge', TYPES.Int, minAge)
            request.addParameter('maxAge', TYPES.Int, maxAge)
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

/* function(columns) {
            columns.forEach(function(column) {
              if (column.value === req.query.age) {
                context.log('NULL');
              } else {
                context.log("Statistic Updated.");
              }
            });*/
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
        const request = new Request(sql, (err) => {
            if(err) {
                reject(err)
                console.log(err)
            }
            })
        request.addParameter('email', TYPES.VarChar, email)
        request.addParameter('password', TYPES.VarChar, password)
        request.on('requestCompleted', (row) => {
            console.log('User inserted', row); 
            resolve('user inserted', row)
        });
        connection.execSql(request);
    });
}
module.exports.selectAdmin = selectAdmin;

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

function getMatches() {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM [GK7].[matches]`
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
module.exports.getMatches = getMatches;

//GetFullUser baseret på by. Man kan evt. videreudvikle til at match efter by. 
function getUsersNearby(city){
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM [GK7].[users] where city = @city`
        const request = new Request(sql, err => {
            if(err) {
                reject(err)
                console.log(err)
            }})      
            request.addParameter('city', TYPES.VarChar, city)
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