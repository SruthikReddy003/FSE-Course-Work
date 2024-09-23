const mysql = require('mysql2');
const express = require('express');
const session = require('express-session');
const path = require('path');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root@123',
  database: 'sample'
});

const app = express();

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

const port = 21142;

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/get_students', function(request, response) {
  let cgpa = request.query.cgpa;

  if (cgpa) {
    connection.query('SELECT * FROM student WHERE cgpa = ?', [cgpa], function(error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        let table = '<table border="1" style="border-collapse:collapse;">';
        table += '<tr><th style="padding:10px;">FirstName</th><th style="padding:10px;">LastName</th><th style="padding:10px;">Rollno</th><th style="padding:10px;">CGPA</th></tr>';
        results.forEach((row) => {
          table += `<tr><td style="padding:10px;">${row.firstname}</td><td style="padding:10px;">${row.lastname}</td><td style="padding:10px;">${row.rollno}</td><td style="padding:10px;">${row.cgpa}</td></tr>`;
        });
        table += '</table>';
        response.send(table);
      } else {
        response.send('No records found for the CGPA: ' + cgpa);
      }
    });
  } else {
    response.send('Please provide a valid CGPA.');
  }
});

app.listen(port, function() {
  console.log(`Server started on port ${port}`);
  console.log(`Address: http://localhost:${port}`);
});