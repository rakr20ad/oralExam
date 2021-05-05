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
            let checkForMatch = await likeModel.checkMatch()
            context.res = {
            body: checkForMatch
            
            }
        } catch(error) {
            context.res = {
                status: 400, 
                body: error.message
            }
        }
    }