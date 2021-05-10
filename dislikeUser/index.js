const Dislike = require('../Model/dislikeModel');
const dislikeModel = require('../Model/dislikeModel')

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    try{
        await dislikeModel.startDB(); // Start DB connection
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
            var dislike = new Dislike(req)
            console.log(dislike)
            await dislikeModel.dislikeUser(dislike)
            context.res = {
            status: 200
            
            }
        } catch(error) {
            context.res = {
                status: 400, 
                body: error.message
            }
        }
    }