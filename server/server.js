// server/server.js
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud",
});

db.connect((err) => {
  if (err) {
    console.error("Failed to connect to MySQL:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

app.post("/addUser", (req, res) => {
  const { id, name, phone, email } = req.body;
  const insertQuery =
    "INSERT INTO users (id, name, phone, email) VALUES (?, ?, ?, ?)";
  db.query(insertQuery, [id, name, phone, email], (err, result) => {
    if (err) {
      console.error("Error inserting user:", err);
      res.status(500).send("Error inserting user");
    } else {
      console.log("User inserted successfully");
      res.status(200).send("User inserted successfully");
    }
  });
});

app.get("/getUsers", (req, res) => {
  const selectQuery = "SELECT * FROM users";
  db.query(selectQuery, (err, result) => {
    if (err) {
      console.error("Error fetching users:", err);
      res.status(500).send("Error fetching users");
    } else {
      res.json(result);
    }
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
