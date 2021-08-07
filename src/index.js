const express = require('express')
const cors = require("cors")
const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.listen(3001,(req,res) => {
    console.log('Server runing on port ' + 3001)
})

//Dotenv config
const dotenv = require('dotenv')
dotenv.config({path: '.env.development'})
//DB conecction
var mysql = require('mysql')

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
//Routes
app.post('/login',(req,res)=>{
    const {username,password} = req.body
    console.log({
        message: "login try",
        username,
        password
    })
    connection.query('SELECT * FROM users WHERE name = ? AND password = ?',
    [username,password],
    (err,result) => {
        if (err) {
            res.status(500).send({error: "500"})
        }
        if(result.length > 0){
            res.send(result) 
        }else{
            res.status(406).send({message:"Wrong combination"})
        }
    })
})

app.post('/register',(req,res) =>{
    const {username,email,password,userConfirmPassword} = req.body
    if(password !== userConfirmPassword){
        res.status(400).send("Are not the same password")
        return null
    
    }else{
        connection.query("INSERT INTO users (name,email,password) VALUES (?,?,?)",
        [username,email,password],
        (err,result) => {
            console.log(err)
            console.log(result)
            if(err) return'Error'
        res.send('All ok')
        })
    }
    
})