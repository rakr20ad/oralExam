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
        case 'GET': 
            await get(context, req);
            break; 

    };
}

    //Show nearby users
    async function get(context, req) {
        try {
            //var user = new datingUser(req)
            let id = (req.query.id || (req.body && req.body.id));
            //let user = new User(firstName)
            console.log(id)
            let result = await db.getUsersNearby(id)
            context.res = {
                status: 200,
                //isRaw: true,
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