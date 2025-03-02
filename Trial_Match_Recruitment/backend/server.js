const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysqlroot",
  database: "clinicaltrials",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("MySQL connected...");
});

// User Registration
app.post("/registerUser", (req, res) => {
  const { username, email, password, age, gender, race, chronicDiseases, trialHistory } = req.body;
  const sql = "INSERT INTO users (username, email, pwd, age, gender, race, past_chronic_diseases, history_of_trials) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [username, email, password, age, gender, race, JSON.stringify(chronicDiseases), trialHistory];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting user:", err);
      return res.status(500).send({ error: err.message });
    }
    res.send({ message: "User registered successfully!" });
  });
});

// Tester Registration
app.post("/registerTester", (req, res) => {
  const { organization_name, organization_type, fda_number, description, sex, age, race, past_diseases, test_type, duration } = req.body;
  const sql = "INSERT INTO Testers (organization_name, organization_type, fda_number, description, sex, age, race, past_diseases, test_type, duration) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [organization_name, organization_type, fda_number, description, sex, age, race, past_diseases, test_type, duration];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting tester:", err);
      return res.status(500).send({ error: err.message });
    }
    res.send({ message: "Tester registered successfully!" });
  });
});

app.get("\trialinformation", (req, res) => {
  const sql = "SELECT * FROM Testers";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching testers:", err);
      return res.status(500).send({ error: err.message });
    }
    res.send(results);
  });
});

// User Login
app.post("/loginUser", (req, res) => {
  const { email, password } = req.body;
  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, results[0].password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: results[0].id }, "your_secret_key", { expiresIn: "1h" });
    res.json({ token, user: results[0] });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});