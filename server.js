const express = require("express");
const mysql = require("mysql");
const multer = require("multer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const db = mysql.createConnection({
  user: "root",
  host: "Localhost",
  password: "",
  database: "santech",
});

db.connect((error) => {
  if (error) throw error;
  console.log("database connected successfully");
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/login", (req, res) => {
  const { username = "info@santechrwanda.com", password = "santechrwanda21" } =
    req.body;
  const sql = "SELECT * FROM loginn WHERE username = ? AND password = ? ";

  db.query(sql, [username, password], (err, results) => {
    if (err) {
      console.error("Error executing MySQL query");
      throw err;
    }

    if (results.length > 0) {
      res.json({ success: true, message: "Login successful" });
    } else {
      res.json({ Error: false, message: "Invalid username or password" });
    }
  });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../santech-app/public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.get("/post", (req, res) => {
  const q = "SELECT * FROM  posts";
  db.query(q, (err, data) => {
    if (err) return res.send(err);

    return res.status(200).json(data);
  });
});
app.get("/post/:id", (req, res) => {
  const q = "SELECT * FROM posts WHERE id = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data[0]);
  });
});

app.post("/posts", (req, res) => {
  const q =
    "INSERT INTO posts(`title`, `description`, `img`, `date`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.description,
    req.body.img,
    req.body.date,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("post blog has been created");
  });
});
app.delete("/:id");
app.put("/:id");

//////////////////////////////////////////////////////////
// testmonials

const storagee = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../santech-app/public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const uploadss = multer({ storagee });
app.post("/api/upload", uploadss.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.post("/testimonial", (req, res) => {
  const q =
    "INSERT INTO testmonials(`title`, `details`, `img`, `date`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.details,
    req.body.img,
    req.body.date,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("post testmonial has been created");
  });
});

app.get("/testimonial", (req, res) => {
  const q = "SELECT * FROM  testmonials";
  db.query(q, (err, data) => {
    if (err) return res.send(err);

    return res.status(200).json(data);
  });
});

//////////////////////////////////////////////
// home slide

const uploadsss = multer({ storagee });
app.post("/api/upload", uploadsss.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.post("/homeslides", (req, res) => {
  const q = "INSERT INTO slidshow(`tittle`,`captionn`,`imag`) VALUES (?)";

  const values = [req.body.tittle, req.body.captionn, req.body.imag];
  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("home slide has been created");
  });
});

app.get("/homeslides", (req, res) => {
  const q = "SELECT * FROM slidshow";
  db.query(q, (err, data) => {
    if (err) return res.send(err);

    return res.status(200).json(data);
  });
});

/////////////////////////////////////////////////////////////////////////////
// Clients & Partners

const uploadssss = multer({ storagee });
app.post("/api/upload", uploadssss.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.post("/partner", (req, res) => {
  const q = "INSERT INTO partners(`img`) VALUES (?)";

  const values = [req.body.img];
  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("partners has been created");
  });
});

app.get("/partner", (req, res) => {
  const q = "SELECT * FROM partners";
  db.query(q, (err, data) => {
    if (err) return res.send(err);

    return res.status(200).json(data);
  });
});

app.listen(4040, () => {
  console.log("server is running on port 4040");
});
