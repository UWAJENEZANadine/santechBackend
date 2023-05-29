const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors")

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
  user: "root",
  host: "Localhost",
  password: "",
  database: "santech",
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;

  db.query(
    "INSERT INTO user (name, age, country, position, wage) VALUES (?,?,?,?,?)",
    [name, age, country, position, wage],
    (err, result) => {
      if (err){
        console.log(err)
      } else{
        res.send("Data inserted successfully")
      }
    }
  );
});


app.get('/users', (req, res)=>{
  db.query("SELECT * FROM user", (err, result)=>{
    if(err){
      console.log(err)
    }else{
      res.send(result)
    }
  })
})

app.listen(4040, () => {
  console.log("server is running on port 4040");
});
