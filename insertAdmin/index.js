const adminModel = require('../Model/adminModel')
const Admin = require('../Model/adminModel')

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    try{
        await adminModel.startDB(); // Start DB connection
    } catch(error) {
        console.log("Error connecting to the database", error.message)
    }
    switch(req.method){
        case 'POST':
            console.log("test")
            await post(context, req);
            break; 
        }
    }

    async function post(context, req) {
        try {
            var adminUser = new Admin(req)
            await adminModel.insertAdmin(adminUser)
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

