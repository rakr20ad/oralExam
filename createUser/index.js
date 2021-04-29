const db = require('../shared/db')
//const router = express.router
const User = require('../Model/user')



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
        case 'POST':
            console.log("test")
            await post(context, req);
            break; 
        default:
            context.res = {
                body: "Please get or post"
            };
            break
        }
    }

   async function get(context, req) {
        try {
            let firstName = (req.query.firstName || (req.body && req.body.firstName));
            let result = await db.selectFirstname(firstName)
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
    async function post(context, req) {
        try {
            let user = req.body;
            //let user = new User(user1) 
            /*new User(
                req.body.firstName,
                req.body.lastName,
                req.body.email,
                req.body.password, 
                req.body.birthday,
                req.body.city,
                req.body.country,
                req.body.gender,
                req.body.preferred_gender
            )*/
            await db.insert(user)
            context.res = {
            body: {status: 'Success'}
            
        }
        } catch(error) {
            context.res = {
                status: 400, 
                body: error.message
            }
        }
    }
    
/*const name = (req.query.name || (req.body && req.body.name));
const responseMessage = name
    ? "Hello, " + name + ". This HTTP triggered function executed successfully."
    : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

context.res = {
    // status: 200, /* Defaults to 200 */
    /*body: responseMessage
};*/