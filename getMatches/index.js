const db = require('../shared/db')
//const router = express.router
//const User = require("../Model/user");


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
        /*case 'POST':
            console.log("test")
            await post(context, req);
            break; */
        /*default:
            context.res = {
                body: "Please get or post"
            };
            break*/
        }
    }

   async function get(context) {
        try {
           // let firstName = req.query.firstName
            //console.log(firstName)
            let result = await db.getMatches()
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