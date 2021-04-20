const { Connection, Request, TYPES } = require('tedious'); 
const config = require('./config.json'); 

var connection = new Connection(config); 

function startDB(){
    return new Promise((resolve, reject) => {
        connection.on('connect', (err) => {
            if (err) {
                console.log('Connection failed')
                reject(err)
                throw err;
            } else {
                console.log('Connected')
                resolve();
            }
        })
        connection.connect();
    })
}
module.exports.sqlConnection = connection; 
module.exports.startDB = startDB;

//Tilhører CreateUser funktionen
function insert(payload){
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO [GK7].[users] (name, email, gender, country, birthday, image) VALUES (@name, @email, @gender, @country, @birthday, @image)`
        const request = new Request(sql, (err) => {
            if (err) {
                reject(err)
                console.log(err)
            }
        });
        request.addParameter('name', TYPES.VarChar, payload.name)
        request.addParameter('email', TYPES.VarChar, payload.email)
        request.addParameter('gender', TYPES.VarChar, payload.gender)
        request.addParameter('country', TYPES.VarChar, payload.country)
        request.addParameter('birthday', TYPES.Date, payload.birthday)
        request.addParameter('image', TYPES.VarChar, payload.image)

        request.on('requestCompleted', (row) => {
            console.log('User inserted', row); 
            resolve('user inserted', row)
        });
        connection.execSql(request);
    });
}
module.exports.insert = insert;

//Tilhører GetUser funktionen
function SELECT(firstName){
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM [GK7].[users] where firstName = @firstName'
        const request = new Request(sql, (err, rowcount) => {
            if(err) {
                reject(err)
                console.log(err)
            }else if (rowcount == 0) {
                reject ({message: 'User does not exist'})
            }
        })
        request.addParameter('firstName', TYPES.VarChar, firstName)
        request.on('row', (columns) => {
            resolve(columns)
        })
        connection.execSql(request)
    })
}
module.exports.SELECT = SELECT;

//Tilhører Login funktionen - samme som ovenstående syntaks
//Rasmus: Jeg aner ikke, hvilken sql function, man skal vælge her????? 
//Men tænker at dette er noget, vi kan bygge videre på.. 
function select(email, password){
    return new Promise((resolve, reject) => {
        const sql = 'SELECT id FROM [GK7].[users] WHERE email = @email AND password = @password'
        const request = new Request(sql, (err, rowcount) => {
            if(err) {
                reject(err)
                console.log(err)
            }else if (rowcount == 0) {
                reject ({message: 'email or password does not exist'})
            }
        })
        request.addParameter('email', TYPES.VarChar, email)
        request.addParameter('password', TYPES.VarChar, password)
        request.on('row', (columns) => {
            resolve(columns)
        })
        connection.execSql(request)
    })
}
module.exports.select = select;

function insert(user){
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO [GK7].[users] (firstName, lastName, email, password, city, country, gender, preferred_gender) VALUES (@firstName, @lastName, @email, @password, @city, @country, @gender, @preferred_gender)`
        const request = new Request(sql, (err) => {
            if (err) {
                reject(err)
                console.log(err)
            }
        });
        request.addParameter('firstName', TYPES.VarChar, user.firstName)
        request.addParameter('lastName', TYPES.VarChar, user.lastName)
        request.addParameter('email', TYPES.VarChar, user.email)
        request.addParameter('password', TYPES.VarChar, user.password)
       // request.addParameter('birthday', TYPES.Date, user.birthday)
        request.addParameter('city', TYPES.VarChar, user.city)        
        request.addParameter('country', TYPES.VarChar, user.country)        
        request.addParameter('gender', TYPES.VarChar, user.gender)
        request.addParameter('preferred_gender', TYPES.VarChar, user.preferred_gender)

        request.on('requestCompleted', (row) => {
            console.log('User inserted', row); 
            resolve('user inserted', row)
        });
        connection.execSql(request);
    });
}
module.exports.insert = insert;