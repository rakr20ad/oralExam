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