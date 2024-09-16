// const mysql = require('mysql2');
// const express = require('express');
// const session = require('express-session');
// const path = require('path');

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root@123',
//     database: 'nodelogin'
//   });

// const app = express();

// app.use(session({
//   secret: 'secret',
//   resave: true,
//   saveUninitialized: true
// }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'static')));

// app.get('/', function(request, response) {
//   response.sendFile(path.join(__dirname + '/login.html'));
// });

// app.post('/auth', function(request, response) {
//   let username = request.body.username;
//   let password = request.body.password;

//   if (username && password) {
//     connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
//       if (error) throw error;
//       if (results.length > 0) {
//         request.session.loggedin = true;
//         request.session.username = username;
//         response.redirect('/home');
//       } else {
//         response.send('Incorrect Username and/or Password!');
//       }
//       response.end();
//     });
//   } else {
//     response.send('Please enter Username and Password!');
//     response.end();
//   }
// });

// app.get('/home', function(request, response) {
//   if (request.session.loggedin) {
//     response.send('Welcome back, ' + request.session.username + '!');
//     alert('Login Successful!');
//   } else {
//     response.send('Please login to view this page!');
//   }
//   response.end();
// });

// app.listen(3000, function() {
//   console.log('Server started on port 3000');
// });

const mysql = require('mysql2');
const express = require('express');
const session = require('express-session');
const path = require('path');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root@123',
  database: 'nodelogin'
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

// Change the location to 21142
const port = 21142;

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname + '/login.html'));
});

app.post('/auth', function(request, response) {
  let username = request.body.username;
  let password = request.body.password;

  if (username && password) {
    connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        request.session.loggedin = true;
        request.session.username = username;
        response.redirect('/home');
      } else {
        response.send('Incorrect Username and/or Password!');
      }
      response.end();
    });
  } else {
    response.send('Please enter Username and Password!');
    response.end();
  }
});

app.get('/home', function(request, response) {
  if (request.session.loggedin) {
    response.send(`Welcome back, ${request.session.username}!`);
    // Note: alert is not a valid function in Node.js, it's a browser function.
    // If you want to display a message, you should do it in the frontend.
  } else {
    response.send('Please login to view this page!');
  }
  response.end();
});

app.get('/signup', function(request, response) {
  response.sendFile(path.join(__dirname + '/signup.html'));
});

// app.post('/signup', function(request, response) {
//   let username = request.body.username;
//   let password = request.body.password;

//   if (username && password) {
//     connection.query('INSERT INTO accounts (username, password) VALUES (?, ?)', [username, password], function(error, results, fields) {
//       if (error) {
//         response.status(500).send('Error creating account: ' + error);
//       } else {
//         response.send('Account created successfully!');
//       }
//     });
//   } else {
//     response.status(400).send('Please enter Username and Password!');
//   }
// });
app.post('/signup', function(request, response) {
  let username = request.body.username;
  let password = request.body.password;

  if (username && password) {
    connection.query('INSERT INTO accounts (username, password) VALUES (?, ?)', [username, password], function(error, results, fields) {
      if (error) {
        response.status(500).send('Error creating account: ' + error);
      } else {
        response.send(`
          <h1>Account created successfully!</h1>
          <p>You will be redirected to the login page in <span id="counter">3</span> seconds.</p>
          <script>
            let counter = 3;
            let interval = setInterval(function() {
              document.getElementById('counter').innerText = --counter;
              if (counter === 0) {
                clearInterval(interval);
                window.location.href = '/';
              }
            }, 1000);
          </script>
        `);
      }
    });
  } else {
    response.status(400).send('Please enter Username and Password!');
  }
});

app.listen(port, function() {
  console.log(`Server started on port ${port}`);
  console.log(`Address: http://localhost:${port}`);
});