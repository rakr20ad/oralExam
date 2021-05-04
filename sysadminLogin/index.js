const adminModel = require('../Model/adminModel')

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    try{
        await adminModel.startDB(); // Start DB connection
    } catch(error) {
        console.log("Error connecting to the database", error.message)
    }
    switch(req.method){
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

    async function post(context, req) {
        try {
            let email = req.body.email
            let password = req.body.password
            let admin = await adminModel.selectAdmin(email, password)
            context.res = {
            status: 200,
            body: admin, 
            headers: {
                'Content-Type': 'application/json'
            }
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