const userModel = require('../Model/userModel')

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    try{
        await userModel.startDB(); // Start DB connection
    } catch(error) {
        console.log("Error connecting to the database", error.message)
    }
    switch(req.method){
        case 'GET': 
            await get(context, req);
            break; 

    };
}

    //Show users 
    async function get(context) {
        try {
            let result = await userModel.getUsers()
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