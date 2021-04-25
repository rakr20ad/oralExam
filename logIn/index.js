//Vi har kopieret syntaks fra Nikolajs video, så alt det der også er inde fra createUser/index.js, 
//(...) logikken bag, er at vi vil get mail for at tjekke om det er i databasen 
//const User = require("../Model/user");
const db = require("../shared/db");
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
            break; }
        /*default:
            context.res = {
                body: "Please get or post"
            };
            break
        }*/
    }

    // Vores login
    async function post(context, req) {
        try {
            let email = req.body.email
            let password = req.body.password
            let user = await db.select(email, password);
            console.log(user)
        if (email == user.email){
            context.res = {
                status: 200, 
                body: {msg:'You have succesfully logged in'},
                headers: {
                    'Content-Type': 'application/json'
                }
        }}
             else {
             context.res = {
                status: 401
             } 
        }
    } catch(error) {
            context.res = {
                status: 400, 
                body: error.message
            }
        }
    };
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
