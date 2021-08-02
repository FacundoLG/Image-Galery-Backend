const express = require('express')
const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())



console.log(process.env.HOLA)
app.listen(3001,(req,res) => {
    console.log('Server runing on port ' + 3001)
})

const db = require('./database/db')

app.get("/",(req,res) =>{
    res.send("Work")
})