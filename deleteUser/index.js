
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
            // We're using email and password to verify deletion
            let email = (req.query.email || (req.body && req.body.email));
            let password = (req.query.password || (req.body && req.body.password));
            //let user = new User(firstName)
            console.log(email, password)
            let user = await userModel.deleteUser(email, password)
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