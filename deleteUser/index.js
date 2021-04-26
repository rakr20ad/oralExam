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
            await deleteAccount(context, req);
            break; 
        }
    }

    async function deleteAccount(context, req) {
        try {
            let email = (req.query.email || (req.body && req.body.email));
            let password = (req.query.password || (req.body && req.body.password));
            //let user = new User(firstName)
            console.log(email, password)
            let user = await db.deleteUser(email, password)
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