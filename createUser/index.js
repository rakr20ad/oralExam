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
            let name = req.query.name
            console.log(name)
            let user = await db.select(name)
            context.res = {
                body: user
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
            let payload = req.body; 
            await db.insert(payload); 
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