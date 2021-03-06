const datingUserModel = require('../Model/datingUserModel');

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

    };
}

    //Filter by age 
    async function get(context, req) {
        try {
            let id = (req.query.id || (req.body && req.body.id));
            let minAge = (req.query.minAge || (req.body && req.body.minAge));
            let maxAge = (req.query.maxAge || (req.body && req.body.maxAge));
            let result = await datingUserModel.filterAge(id, minAge, maxAge)
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