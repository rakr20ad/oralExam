//const datingUser = require("../Model/user");
const datingUserModel = require("../Model/datingUserModel.js");
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
        await post(context, req);
        break; 
    case 'GET':
        console.log("test")
        await get(context, req);
        break; 
    }
            
};    

    // Our login 
    async function post(context, req){
        try {
            let email = (req.query.email || req.body && req.body.email);
            let password = (req.query.password || req.body && req.body.password);
            let userArr = await datingUserModel.select(email, password);
            context.res = {
                status: 200, 
                body: userArr,
                headers: {
                    'Content-Type': 'application/json'
            }
    }/*
             else {
             context.res = {
                status: 401
             } 
        }*/
    } catch(error) {
            context.res = {
                status: 400, 
                body: error.message
            }
        }
    };

    async function get(context, req) {
        try {
            //var user = new datingUser(req)
            let email = (req.query.email || (req.body && req.body.email));
            let password = (req.query.password || (req.body && req.body.password));
            //let user = new User(firstName)
            
            let result = await datingUserModel.select(email, password)
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
                body: `no user - ${error.message}`
            }
        }
    }
/*
    async function get(context, req) {
        try {
            let email = req.query.email
            console.log(email)
            let userEmail = await db.select(email)
            context.res = {
                body: userEmail
            }
        } catch(error) {
            context.res = {
                status: 400, 
                body: `no email - ${error.message}`
            }
        }
    };
*/

   /* async function post(context, req) {
        try {
            let user = new User(
                req.body.firstName,
                req.body.lastName,
                req.body.email,
                req.body.password, 
               // req.body.birthday,
                req.body.city,
                req.body.country,
                req.body.gender,
                req.body.preferred_gender
            )
            await db.insert(user)
            context.res = {
            body: "",
            headers: {
                "Content-Type": "text/html"
            }
        };
        if (req.query.name == (req.body && req.body.name)) {
            // Just return some HTML
            res.body = "<h1>Hello " + (req.query.name == req.body.name) + "</h1>";

            context.done(null, res);
        } else {
            // Read an HTML file in the directory and return the contents
            fs.readFile(path.resolve(__dirname, 'index.html'), 'UTF-8', (err, htmlContent) => {
                res.body= htmlContent;
                context.done(null, res);
            });
        }
        } catch(err) {
            context.res = {
                status: 400, 
                body: err.message
            }
        }
    };  */  
  /*      
            let payload = req.body; 
            await db.insert(payload); 
            context.res = {
                body: User{status: 'Success'}
            }
        } catch(error) {
            context.res = {
                status: 400, 
                body: error.message
            }
        }
    }
*/
