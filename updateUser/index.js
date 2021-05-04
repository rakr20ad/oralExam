const datingUserModel = require('../Model/datingUserModel')

const datingUser = require('../Model/datingUserModel')

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    try{
        await db.startDB(); // Start DB connection
    } catch(error) {
        console.log("Error connecting to the database", error.message)
    }
    switch(req.method){
        case 'PUT': 
            await put(context, req);
            break; 
         }
    }

   async function put(context, req) {
        try {
            let age = (req.query.age || (req.body && req.body.age));
            let email = (req.query.email || (req.body && req.body.email));
            let password = (req.query.password || (req.body && req.body.password));
            let result = await datingUserModel.update(age, email, password)
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
                body: `no user - ${error}`
            }
        }
    }