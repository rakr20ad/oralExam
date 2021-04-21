const db = require("../shared/db");
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');


    try{
        await db.startDB(); // Start DB connection
    } catch(error) {
        console.log("Error connecting to the database", error.message)
    }
    switch(req.method){
       /* case 'GET': 
            await get(context, req);
            break;*/ 
        case 'POST':
            console.log("test")
            await post(context, req);
            break; }
        /*default:
            context.res = {
                body: "Please get or post"
            };
            break
        }*/
    }

    //Ved ikke, om man først skal get'e, isåfald er jeg lidt på bar bund ift. hvorfor.  
  /*  async function get(context, req) {
        try {
            let email = req.query.email
            console.log(email)
            let users = await db.SELECT(email)
            context.res = {
                body: users
            }
        } catch(error) {
            context.res = {
                status: 400, 
                body: `no user - ${error.message}`
            }
        }
    }
*/
    // Hvilken SQL statement tjekker om noget stemmer overens med databasen 
    // Eller er den logik i db.js? 
    async function post(context, req) {
        try {
            let email = req.body.email
            let password = req.body.password
            let admin = req.body
            await db.selectAdmin(email, password)
            context.res = {
            body: admin, 
            status: 200
            /*context.res.status(302) 
            .set('location', 'homepage.html')
            .send()*/
        } }catch(error) {
            context.res = {
                status: 400, 
                body: error.message
            }
        }
    }