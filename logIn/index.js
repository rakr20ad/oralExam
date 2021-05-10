//const datingUser = require("../Model/user");
const datingUserModel = require("../Model/datingUserModel.js");
module.exports = async function (context, req) {
context.log('JavaScript HTTP trigger function processed a request.');


try{
    await datingUserModel.startDB(); // Start DB connection
} catch(error) {
    console.log("Error connecting to the database", error.message)
}
switch(req.method){
    case 'POST':
        console.log("test")
        await post(context, req);
        break; 
    case 'GET':
        console.log("test")
        await get(context, req);
        break; 
    }
            
};    

    // Our login 
    async function post(context, req){
        try {
            let email = (req.query.email || req.body && req.body.email);
            let password = (req.query.password || req.body && req.body.password);
            let userArr = await datingUserModel.select(email, password);
            context.res = {
                status: 200, 
                body: userArr,
                headers: {
                    'Content-Type': 'application/json'
            }
    }/*
             else {
             context.res = {
                status: 401
             } 
        }*/
    } catch(error) {
            context.res = {
                status: 400, 
                body: error.message
            }
        }
    };

    async function get(context, req) {
        try {
            let email = (req.query.email || (req.body && req.body.email));
            let password = (req.query.password || (req.body && req.body.password));            
            let result = await datingUserModel.select(email, password)
            context.res = {
                status: 200,
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
    }

