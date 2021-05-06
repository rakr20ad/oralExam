const Like = require('../Model/likeModel');
const datingUserModel = require('../Model/datingUserModel')

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    try{
        await datingUserModel.startDB(); // Start DB connection
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
            var like = new Like(req)
            await datingUserModel.likeUser(like)
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

