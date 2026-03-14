const express = require("express")
const mysql = require("mysql2")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
 host: process.env.MYSQLHOST,
 user: process.env.MYSQLUSER,
 password: process.env.MYSQLPASSWORD,
 database: process.env.MYSQLDATABASE
})

app.post("/salvar-email",(req,res)=>{

 const email = req.body.email

 const sql = "INSERT INTO emails (email) VALUES (?)"

 db.query(sql,[email],(err,result)=>{

  if(err){
   console.log(err)
   res.status(500).send("erro")
   return
  }

  res.send("email salvo")

 })

})

app.listen(process.env.PORT || 3000,()=>{
 console.log("API rodando")
})