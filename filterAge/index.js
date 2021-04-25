const db = require('../shared/db')

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
            let minAge = (req.query.minAge || (req.body && req.body.minAge));
            let maxAge = (req.query.maxAge || (req.body && req.body.maxAge));
            //let user = new User(firstName)
            console.log(minAge, maxAge)
            let result = await db.filterAge(minAge, maxAge)
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