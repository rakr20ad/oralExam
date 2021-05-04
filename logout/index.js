const db = require("../shared/db");
const datingUser = require("../Model/user.js");
module.exports = async function (context, req) {
context.log('JavaScript HTTP trigger function processed a request.');


try{
    await db.startDB(); // Start DB connection
} catch(error) {
    console.log("Error connecting to the database", error.message)
}
switch(req.method){ 
    case 'GET':
        console.log("test")
        await get(context, req);
        break; 
    }
            
};    

    // Our login 
    async function get(context, req){
        try {
           //var user = new datingUser(req)
            let id = (req.query.id || req.body && req.body.id);
            let user = await db.logout(id);
            console.log(user)
            
            context.res = {
                status: 200, 
                body: user,
                headers: {
                    'Content-Type': 'application/json'
            }
    }
    } catch(error) {
            context.res = {
                status: 400, 
                body: error.message
            }
        }
    };
