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

    //Filter by gender
    async function get(context, req) {
        try {
            let id = (req.query.id || (req.body && req.body.id));
            let gender = (req.query.gender || (req.body && req.body.gender));
            console.log(gender)
            let result = await datingUserModel.filterGender(id, gender)
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