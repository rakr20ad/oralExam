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

function select(name){
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM [GK7].[users] where name = @name'
        const request = new Request(sql, (err, rowcount) => {
            if(err) {
                reject(err)
                console.log(err)
            }else if (rowcount == 0) {
                reject ({message: 'User does not exist'})
            }
        })
        request.addParameter('name', TYPES.VarChar, name)
        request.on('row', (columns) => {
            resolve(columns)
        })
        connection.execSql(request)
    })
}
module.exports.select = select;