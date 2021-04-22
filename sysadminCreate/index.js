const db = require('../shared/db')
//const router = express.router
const Admin = require("../Model/admin");


module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    try{
        await db.startDB(); // Start DB connection
    } catch(error) {
        console.log("Error connecting to the database", error.message)
    }
    switch(req.method){
        /*case 'GET': 
            await get(context, req);
            break; */
        case 'POST':
            console.log("test")
            await post(context, req);
            break; /*
        default:
            context.res = {
                body: "Please get or post"
            };
            break*/
        }
    }


    async function post(context, req) {
        try {
            let admin1 = req.body;
            let admin = new Admin(admin1) /*new User(
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
            await db.insertAdmin(admin)
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