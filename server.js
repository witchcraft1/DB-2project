// const express = require('express');
// const path = require('path');
// const app = express();
// const bodyParser = require('body-parser');
// const nodemailer = require("nodemailer");

// app.use(bodyParser.json());


// const mysql = require('mysql');
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'dbname'
// });

// connection.connect();

// app.get('/get-users', (req, res) => {
//   connection.query('SELECT * FROM users;', function (err, rows, fields) {
//     if (err) return res.json({ success: false });
//     return res.json({ success: true, data: rows });
//   });
// });

// app.post('/add-user', async (req, res) => {
//   console.log(req.body)
//   const password = Math.random().toString(36).slice(-8);
//   let testAccount = await nodemailer.createTestAccount();
//   let transporter = nodemailer.createTransport({
//     host: "some.bullshit.com",
//     port: 587,
//     secure: false,
//     auth: {
//       user: testAccount.user,
//       pass: testAccount.pass
//     }
//   });

//   await transporter.sendMail({
//     from: '"Fred Foo 👻" <foo@example.com>',
//     to: res.body.email,
//     subject: "Hello ✔",
//     text: `Your login is ${res.body.email}. Your password ${password}`,
//     html: "<b>Hello world???</b>"
//   });
//   connection.query(`INSERT INTO users(id, name,  email, password, comm, worbef, skills, knowledge) VALUES (null, "${req.body.name}", "${req.body.email}", "${password}", ${req.body.char[0]}, ${req.body.char[1]}, ${req.body.char[2]}, ${req.body.char[3]});`, function (err, rows, fields) {
//     if (err) return res.json({ success: false });
//     return res.json({ success: true });
//   });
// });

// app.delete('/delete-user/:userid', (req, res) => {
//   connection.query(`SELECT task FROM users WHERE id = ${req.params.userid};`, function (err, rows, fields) {
//     if (err) return res.json({ success: false });
//     connection.query(`UPDATE tasks SET user = null WHERE id = ${rows[0].task};`, function (err, rows, fields) {
//       if (err) return res.json({ success: false });

//       connection.query(`DELETE FROM users WHERE id = ${req.params.userid};`, function (err, rows, fields) {
//         if (err) return res.json({ success: false });
//         return res.json({ success: true });
//       });
//     });
//   });
// });

// app.post('/add-task', (req, res) => {
//   connection.query(`INSERT INTO tasks(id, name) VALUES (null, "${req.body.name}");`, function (err, rows, fields) {
//     if (err) return res.json({ success: false });
//     return res.json({ success: true });
//   });
// });

// app.get('/get-tasks', (req, res) => {
//   connection.query('SELECT * FROM tasks;', function (err, rows, fields) {
//     if (err) return res.json({ success: false });
//     return res.json({ success: true, data: rows });
//   });
// });

// app.post('/set-user-task', (req, res) => {
//   connection.query(`UPDATE users SET task = ${req.body.taskid} WHERE id = ${req.body.userid};`, function (err, rows, fields) {
//     if (err) return res.json({ success: false });
//     connection.query(`UPDATE tasks SET user = ${req.body.userid} WHERE id = ${req.body.taskid};`, function (err, rows, fields) {
//       if (err) {
//         return res.json({ success: false });
//         throw err;
//       }
//       return res.json({ success: true });
//     });
//   });
// });

// app.post('/set-another-user-task', (req, res) => {
//   console.log(req.body)
//   connection.query(`UPDATE users SET task = null WHERE id = ${req.body.userid1};`, function (err, rows, fields) {
//     if (err) return res.json({ success: false });
//     connection.query(`UPDATE users SET task = ${req.body.taskid} WHERE id = ${req.body.userid2};`, function (err, rows, fields) {
//       if (err) return res.json({ success: false });
//       connection.query(`UPDATE tasks SET user = ${req.body.userid2} WHERE id = ${req.body.taskid};`, function (err, rows, fields) {
//         if (err) return res.json({ success: false });
//         return res.json({ success: true });
//       });
//     });
//   });
// });

// app.get('/check-task/:id', (req, res) => {
//   connection.query(`SELECT * FROM tasks WHERE id = ${req.params.id};`, function (err, rows, fields) {
//     if (err) return res.json({ success: false });
//     return res.json({ success: true, data: rows });
//   });
// })

// app.get('/check-user/:id', (req, res) => {
//   connection.query(`SELECT id, name, task FROM users WHERE id = ${req.params.id};`, function (err, rows, fields) {
//     if (err) return res.json({ success: false });
//     return res.json({ success: true, status: rows });
//   });
// })

// app.post('/set-state', (req, res) => {
//   connection.query(`UPDATE tasks SET state = "${req.body.state}" WHERE id = ${req.body.taskid};`, function (err, rows, fields) {
//     if (err) return res.json({ success: false });
//     if (req.body.state === 'done') {
//       connection.query(`SELECT user FROM tasks WHERE id = ${req.body.taskid};`, function (err, rows, fields) {
//         if (err) return res.json({ success: false });
//         connection.query(`UPDATE users SET task = null WHERE id = ${+rows[0].user};`, function (err, rows, fields) {
//           if (err) return res.json({ success: false });
//           console.log('we are here')
//           return res.json({ success: true });
//         });
//       });
//     }
//     else return res.json({ success: true });
//   });
// });

// app.use(express.static('client/build'));

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
// })

// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!');
// });

