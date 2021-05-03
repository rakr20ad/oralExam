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

    //Filter by gender
    async function get(context, req) {
        try {
            let email = (req.query.id || (req.body && req.body.id));
            //let user = new User(firstName)
            console.log(gender)
            let result = await db.filterGender(gender)
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