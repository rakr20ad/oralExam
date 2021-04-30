const db = require('../shared/db')

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    try{
        await db.startDB(); // Start DB connection
    } catch(error) {
        console.log("Error connecting to the database", error.message)
    }
    switch(req.method){
        case 'POST':
            await post(context, req);
            break; 
    }
}
    async function post(context, req) {
        try {
            let sender_id = req.query.sender_id;
            let receiver_id = req.query.receiver_id;
            await db.dislikeUser(sender_id, receiver_id)
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