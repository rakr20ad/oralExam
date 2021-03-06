
const userModel = require('../Model/userModel')

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
       
        try{
            await userModel.startDB(); // Start DB connection
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
                let email = (req.query.email || (req.body && req.body.email));
                let password = (req.query._password || (req.body && req.body.password));
                //function is under userModel, as it is both used by admin and datingUser (nedarvet af User)
                let result = await userModel.updateUser(email, password);
                context.res = {
                    status: 200,
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