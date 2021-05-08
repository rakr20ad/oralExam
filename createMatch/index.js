const datingUserModel = require('../Model/datingUserModel');
const Match = require('../Model/matchModel')

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    try{
        await datingUserModel.startDB(); // Start DB connection
    } catch(error) {
        console.log("Error connecting to the database", error.message)
    }
    switch(req.method){
        case 'POST':
            console.log("test")
            await post(context);
            break; 
        }
    }

    async function post(context) {
        try {
            var match = new Match()
            await datingUserModel.createMatch();
            var matchArr = []
            matchArr.push(match)
            context.res = {
            body: matchArr,
            }
        } catch(error) {
            context.res = {
                status: 400, 
                body: error.message
            }
        }
    }
 