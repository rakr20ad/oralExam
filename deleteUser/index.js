
const userModel = require("../Model/userModel");


module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    try{
        await userModel.startDB(); // Start DB connection
    } catch(error) {
        console.log("Error connecting to the database", error.message)
    }
    switch(req.method){
        case 'DELETE':
            await deleteAccount(context, req);
            break; 
        }
    }

    //Delete user
    async function deleteAccount(context, req) {
        try {
            let id = (req.query.id || (req.body && req.body.id));
            let user = await userModel.deleteAccount(id)
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