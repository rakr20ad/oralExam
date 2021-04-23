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
        case 'GET': 
            await get(context, req);
            break; 
        case 'DELETE':
            console.log("test")
            await delete(context, req);
            break; 
        default:
            context.res = {
                body: "Please get or delete"
            };
            break
        }
    }

   async function get(context, req) {
        try {
            let firstName = (req.query.firstName || (req.body && req.body.firstName));
            //let user = new User(firstName)
            console.log(firstName)
            let user = await db.selectUser(firstName)
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

    async function get(context, req) {
        try {
            let firstName = (req.query.firstName || (req.body && req.body.firstName));
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