const db = require('../shared/db')
//const router = express.router
//const User = require("../Model/user");
var fs = require('fs');



module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    try{
        await db.startDB(); // Start DB connection
    } catch(error) {
        console.log("Error connecting to the database", error.message)
    }
    switch(req.method){
        case 'GET': 
            await get(context, req);
            break; 
        /*case 'POST':
            console.log("test")
            await post(context, req);
            break; */
        /*default:
            context.res = {
                body: "Please get or post"
            };
            break*/
        }
    }

    //Dette er funktionen til vores get all users for ADMIN 
   async function get(context) {
        try {
           // let firstName = req.query.firstName
            //console.log(firstName)
            let result = await db.viewAllUsers()
            context.res = {
                status: 200,
                //isRaw: true,
                body: result,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        } catch(error) {
            context.res = {
                status: 400, 
                body: `no user - ${error.message}`
            }
        }
    }/*

const Connection = require('tedious').Connection;
const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;
const config = require('../shared/config.json')

// Entry point of the function
module.exports = function (context, req) {

        /*case 'POST':
            console.log("test")
            await post(context, req);
            break; */
        /*default:
            context.res = {
                body: "Please get or post"
            };
            break*/

    // Define variables to store connection details and credentials
    // Connection details and credentials are fetched from Environment Variables during function execution
    // Modify the connection details and credentials in local.settings.json when running the App locally
    // Add the connection details and credentials in the "Functions App -> Configuration -> Application settings" when running the App on Azure
/*
    // Create Connection object
    const connection = new Connection(config);

    // Create array to store the query results
    let result = [];
    let rowData = {};

    // req.query.color will be passed as a Query variable in the URL
    const firstName = [req.query.firstName];

    // Create query to execute against the database
    const queryText = `SELECT * FROM [GK7].[users]`
    context.log(queryText);

    // Create Request object
    request = new Request(queryText, function (err) {
        if (err) {
            // Error in executing query
            context.log.error(err);
            context.res.status = 500;
            context.res.body = "Error executing the query";
        } else {
            context.res = {
                status: 200,
                isRaw: true,
                body: result,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        }
        // Inform Azure Function runtime that work is done
       
    });

    // Manipulate the results and create JSON
    request.on('row', function (columns) {
        rowData = {};
        columns.forEach(function (column) {
            // IMPORTANT: Change the conversion logic here to adjust the JSON format
            rowData[column.metadata.colName] = column.value;
        });
        result.push(rowData);
    });

    connection.on('connect', function (err) {
        if (err) {
            // Error in connecting
            context.log.error(err);
            context.res.status = 500;
            context.res.body = "Error connecting to Azure Synapase";
            context.done();
        } else {
            // Connection succeeded
            connection.execSql(request);
        }
    })};*/
