const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

const db = mysql.createConnection({
  user: "root",
  host: "Localhost",
  password: "",
  database: "santech",
});

db.connect((error)=>{
  if(error) throw error;
  console.log("database connected successfully")
})

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




app.post('/login', (req, res)=>{

  const { username = "info@santechrwanda.com", password ="santechrwanda21"} = req.body;
  const sql = "SELECT * FROM loginn WHERE username = ? AND password = ? ";

  db.query(sql, [username, password], (err, results) =>{
    if (err) {
      console.error('Error executing MySQL query');
      throw err;
    }

    if (results.length > 0) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.json({ Error: false, message: 'Invalid username or password' });
    }
  });
});

app.listen(4040, () => {
  console.log("server is running on port 4040");
});




// app.post("/create", (req, res) => {
//   const name = req.body.name;
//   const age = req.body.age;
//   const country = req.body.country;
//   const position = req.body.position;
//   const wage = req.body.wage;

//   db.query(
//     "INSERT INTO user (name, age, country, position, wage) VALUES (?,?,?,?,?)",
//     [name, age, country, position, wage],
//     (err, result) => {
//       if (err){
//         console.log(err)
//       } else{
//         res.send("Data inserted successfully")
//       }
//     }
//   ); 
// });


// app.get('/users', (req, res)=>{
//   db.query("SELECT * FROM user", (err, result)=>{
//     if(err){
//       console.log(err)
//     }else{
//       res.send(result)
//     }
//   })
// })



