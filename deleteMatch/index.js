
const matchModel = require('../Model/matchModel')

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    try{
        await matchModel.startDB(); // Start DB connection
    } catch(error) {
        console.log("Error connecting to the database", error.message)
    }
    switch(req.method){
        case 'DELETE':
            await deleteMatch(context, req);
            break; 
        }
    }

    async function deleteMatch(context, req) {
        try {
            let like_id = (req.query.like_id || (req.body && req.body.like_id));
            console.log(like_id)
            let delete_match = await matchModel.deleteMatch(like_id)
            context.res = {
                status: 200,
                body: delete_match
            }
        } catch(error) {
            context.res = {
                status: 400, 
                body: `no user - ${error.message}`
            }
        }
    }