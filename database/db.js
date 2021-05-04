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
                //createMatch()
                resolve();
            }
        })
        connection.connect();
    }) 
}
module.exports.sqlConnection = connection; 
module.exports.startDB = startDB;





//---------------------------ADMINISTRATOR FUNCTIONALITIES BELOW----------------------------------




    // Create query to execute against the database
/*const queryText = `SELECT * FROM [GK7].[datingUser]` //+ (payload[0] != undefined ? " WHERE Color IN ('" + payload[0] + "')" : "") + " GROUP BY Color ORDER BY cnt;";
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
    /*;request = new Request('SELECT * FROM [GK7].[datingUser] as datingUser', function(err) {
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

module.exports.viewAlldatingUser = viewAlldatingUser;*/