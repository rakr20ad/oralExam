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
       /* case 'GET': 
            await get(context, req);
            break;*/ 
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

    //Ved ikke, om man først skal get'e, isåfald er jeg lidt på bar bund ift. hvorfor.  
  /*  async function get(context, req) {
        try {
            let email = req.query.email
            console.log(email)
            let users = await db.SELECT(email)
            context.res = {
                body: users
            }
        } catch(error) {
            context.res = {
                status: 400, 
                body: `no user - ${error.message}`
            }
        }
    }
*/
    // Hvilken SQL statement tjekker om noget stemmer overens med databasen 
    // Eller er den logik i db.js? 
    async function post(context, req) {
        try {
            let email = req.body.email
            let password = req.body.password
            let result = await db.select(email, password)
            context.res = {
                status: 200,
                //isRaw: true,
                body: result,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
     }catch(error) {
            context.res = {
                status: 400, 
                body: error.message
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
/*
//Lidt ala nedenstående, hvor syntaks skal erstattes med databasen og ikke Json filen - men logikken er den samme:
//(...)læs databasen, hvis mail og password er der, hvis de gør 200 sendes tilbage
/*const fs = require('fs');
const User = require('../Model/User');

module.exports = function (app) {

    app.post('/login', (req, res) => {
        let user = new User(
            req.body.firstName,
            req.body.lastName,
        )

        // Læser database
        var users
        try {
            const data = fs.readFileSync('./users.json', 'utf8')
            users = JSON.parse(data)
        } catch (err) {
            users = []
        }

        // Tjekker om brugeren allerede eksistere i database
        var exists = false
        users.forEach(item => {
            if ((item.firstName == user.firstName) && (item.lastName == user.lastName)) {
                exists = true
            }
        });

        if (exists) {
            res.sendStatus(200)
            return
        }
        else {
            res.sendStatus(404)
            return
        }

    })
}*/