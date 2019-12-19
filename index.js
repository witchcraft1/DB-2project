const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const path = require('path');

app.use(bodyParser.json());


sequelize.authenticate()
  .then(() => {
    console.log('Database connected');
    sequelize.sync().then(() => console.log('Database synchronized'));
  })
  .catch(err => console.log(err));

app.use('/users', require('./routes/users'));
app.use('/tasks', require('./routes/tasks'));
app.use('/auth', require('./routes/auth'));


app.use(express.static('client/build'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  // res.send('Hello World!');
})


app.listen(5000, function () {
  console.log('Example app listening on port 5000!');
});