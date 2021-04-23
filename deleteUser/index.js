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
            console.log("test")
            await deleteUser(context, req);
            break; 
        }
    }

    async function deleteUser(context, req) {
        try {
            let firstName = (req.query.firstName || (req.body && req.body.firstName));
            let lastName = (req.query.lastName || (req.body && req.body.lastName));
            //let user = new User(firstName)
            console.log(firstName)
            let user = await db.deleteUser(firstName)
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