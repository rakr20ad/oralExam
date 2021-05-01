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
        case 'DELETE':
            await deleteMatch(context, req);
            break; 
        }
    }

    async function deleteMatch(context, req) {
        try {
            let matchNumber = (req.query.matchNumber || (req.body && req.body.matchNumber));
            console.log(matchNumber)
            let user = await db.deleteMatch(matchNumber)
            context.res = {
                body: user
            }
        } catch(error) {
            context.res = {
                status: 400, 
                body: `no user - ${error.message}`
            }
        }
    }