const db = require('../shared/db')
//const router = express.router
const User = require("../Model/user");
var fs = require('fs');



module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    try{
        await db.startDB(); // Start DB connection
    } catch(error) {
        console.log("Error connecting to the database", error.message)
    }
    switch(req.method){
        case 'POST':
            await post(context, req);
            break; 
    }
}
    async function post(context) {
        try {
            await db.createMatch()
            context.res = {
            body: {status: 'Success'}
            
            }
        } catch(error) {
            context.res = {
                status: 400, 
                body: error.message
            }
        }
    }