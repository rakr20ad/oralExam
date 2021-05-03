const db = require('../shared/db')

class User{
    constructor(req) {
        this.firstName = req.body.firstName; 
        this.lastName = req.body.lastName;
        this.email = req.body.email;
        this.password = req.body.password; 
        
    }
}

class admin extends User {
    constructor(req) {
    super(req) 
    }
    get email() {
        return this.email
    }
    get password() {
        return this._password
    }
    get users() {
        return db.getAllUsers();
      }
    get matches() {
        return db.getAllMatches();
    }
    set password(_password) {
        return db.updateUser(_password)
    }
    
}

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    try{
        await db.startDB(); // Start DB connection
    } catch(error) {
        console.log("Error connecting to the database", error.message)
    }
    switch(req.method){
        case 'GET': 
            await get(context, req);
            break; 
        }
    }

    //Dette er funktionen til vores get all users for ADMIN 
   async function get(context) {
        try {
            let result = await db.getAllUsers()
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
                body: `no user - ${error.message}`
            }
        }
    }