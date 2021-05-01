const db = require('../shared/db')
var fs = require('fs');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
       
        try{
            await db.startDB(); // Start DB connection
        } catch(error) {
            console.log("Error connecting to the database", error.message)
        }
        switch(req.method){
            case 'PUT': 
                await put(context, req);
                break; 
            }
        };

        //Admin update users password: require users email
        async function put(context, req) {
            try {
                let password = (req.query.password || (req.body && req.body.password));
                let email = (req.query.email || (req.body && req.body.email));
                
                let result = await db.updateUser(password, email);
                context.res = {
                    status: 200,
                    //isRaw: true,
                    body: result,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            } catch(error) {
                context.res = {
                    status: 400, 
                    body: `no user - ${error}`
                }
            }
        }