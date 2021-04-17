module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

}

//Lidt ala nedenstående, hvor syntaks skal erstattes med databasen og ikke Json filen
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