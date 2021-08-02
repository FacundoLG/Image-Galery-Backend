var mysql = require('mysql')

const dotenv = require('dotenv')
dotenv.config({path: '.env.development'})

var conectParams = {
    host: process.env.HOST,
    user: 'root',
    port: 3306,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}
console.log(conectParams)
var connection = mysql.createConnection(conectParams)

connection.connect(function(err){
    if(err) {
        console.error('connection error ' + err.stack)
        return
    }
    console.log('conected as id ' + connection.threadId)
})

module.exports = mysql