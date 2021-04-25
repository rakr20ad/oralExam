const db = require('../shared/db')
var fs = require('fs');


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
    async function get(context, req) {
        try {
            let city = (req.query.city || (req.body && req.body.city));
            console.log(city)
            let result = await db.getUsersNearby(city)
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