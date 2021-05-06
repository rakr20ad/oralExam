const adminModel = require("../Model/adminModel.js");

module.exports = async function (context, req) {
context.log('JavaScript HTTP trigger function processed a request.');


try{
    await datingUserModel.startDB(); // Start DB connection
} catch(error) {
    console.log("Error connecting to the database", error.message)
}
switch(req.method){ 
    case 'GET':
        await get(context, req);
        break; 
    }
            
};    

    // Our logout 
    async function get(context, req){
        try {
            let id = (req.query.id || req.body && req.body.id);
            let offline = await adminModel.logout(id);
            
            context.res = {
                status: 200, 
                body: offline,
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