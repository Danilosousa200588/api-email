const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
 host: process.env.MYSQLHOST,
 user: process.env.MYSQLUSER,
 password: process.env.MYSQLPASSWORD,
 database: process.env.MYSQLDATABASE,
 port: process.env.MYSQLPORT
});

// buscar emails
app.get("/api/emails", async (req,res)=>{
 const [rows] = await pool.query("SELECT * FROM emails");
 res.json(rows);
});

// salvar email
app.post("/api/emails", async (req,res)=>{

 const {name,email,category} = req.body;

 await pool.query(
  "INSERT INTO emails (name,email,category,created_at) VALUES (?,?,?,NOW())",
  [name,email,category]
 );

 res.json({success:true});

});

app.listen(3000,()=>{
 console.log("API rodando");
});