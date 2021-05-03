const db = require('../shared/db')

const Match = require('../Model/match')

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    try{
        await db.startDB(); // Start DB connection
    } catch(error) {
        console.log("Error connecting to the database", error.message)
    }
    switch(req.method){
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

    async function post(context, req) {
        try {
            var match = new Match()
            console.log(match)
            await db.createMatch();
            var matchArr = []
            matchArr.push(match)
            context.res = {
            body: {status: 'Success'},
            }
        } catch(error) {
            context.res = {
                status: 400, 
                body: error.message
            }
        }
    }
 