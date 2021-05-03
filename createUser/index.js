const db = require('../shared/db')

const datingUser = require('../Model/user')

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    try{
        await db.startDB(); // Start DB connection
    } catch(error) {
        console.log("Error connecting to the database", error.message)
    }
    switch(req.method){
        case 'POST':
            console.log("test")
            await post(context, req);
            break; 
        }
    }

    async function post(context, req) {
        try {
            var user = new datingUser(req)
            console.log(user)
            await db.insert(user)
            context.res = {
            body: user
            }
        } catch(error) {
            context.res = {
                status: 400, 
                body: error.message
            }
        }
    }
 
