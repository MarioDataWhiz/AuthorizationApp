import express from 'express';
import mysql from 'mysql';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors()); // Use CORS middleware
app.use(express.json());

app.get('/', (req, res) => {
    return res.json({"From Server": "Hello World"});
})

app.listen(5001, () => { // Change the port number here
    console.log('Server is running on port 5001!');
})

// Set up MySQL connection using environment variables
const db = mysql.createConnection({
  host: 'database-1.cnqe00p5d1ax.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'Timndbpw10!',
  database: 'mariodb', // Replace with your database name
  port: 3306
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
    return;
  }
  console.log('Connected to the database');
});

// Get all employees
app.get('/employees', (req, res) => {
  const sql = `
    SELECT 
      employee_id, 
      first_name, 
      last_name, 
      email, 
      DATE_FORMAT(birthdate, "%Y-%m-%d") as birthdate, 
      CONCAT('$', FORMAT(salary, 2)) as salary 
    FROM employees
  `;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Add new employee
app.post('/employees', (req, res) => {
  const { first_name, last_name, email, birthdate, salary } = req.body;
  const sql = 'INSERT INTO employees (first_name, last_name, email, birthdate, salary) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [first_name, last_name, email, birthdate, salary], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Employee added successfully', id: result.insertId });
  });
});

// Edit employee
app.put('/employees/:id', (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, birthdate, salary } = req.body;
  const sql = 'UPDATE employees SET first_name = ?, last_name = ?, email = ?, birthdate = ?, salary = ? WHERE employee_id = ?';
  db.query(sql, [first_name, last_name, email, birthdate, salary, id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Employee updated successfully' });
  });
});

// Delete employee
app.delete('/employees/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM employees WHERE employee_id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Employee deleted successfully' });
  });
});