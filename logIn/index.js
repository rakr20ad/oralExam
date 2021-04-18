//Vi har kopieret syntaks fra Nikolajs video, så alt det der også er inde fra createUser/index.js, 
//(...) logikken bag, er at vi vil get mail for at tjekke om det er i databasen 
const db = require("../shared/db");
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const db = require('../shared/db')

    try{
        await db.startDB(); // Start DB connection
    } catch(error) {
        console.log("Error connecting to the database", error.message)
    }
    switch(req.method){
        case 'GET': 
            await get(context, req);
            break; 
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