const likeModel = require('../Model/likeModel')

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    try{
        await likeModel.startDB(); // Start DB connection
    } catch(error) {
        console.log("Error connecting to the database", error.message)
    }
    switch(req.method){
        case 'GET':
            await get(context, req);
            break; 
    }
}
    async function get(context, req) {
        try {
            let sender_id = (req.query.sender_id || req.body && req.body.sender_id)
            let receiver_id = (req.query.receiver_id || req.body && req.body.receiver_id)
            let checkForMatch = await likeModel.checkMatch(sender_id, receiver_id)
            context.res = {
            status: 200,
            body: checkForMatch
            
            }
        } catch(error) {
            context.res = {
                status: 400, 
                body: error.message
            }
        }
    }