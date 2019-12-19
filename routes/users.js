const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const nodemailer = require('nodemailer');

router.get('/', (req, res) => {
  Users
    .findAll()
    .then(users => res.json(users))
    .catch(err => console.log(err))
});

router.post('/add', (req, res) => {
  const password = Math.random().toString(36).slice(-8);
  Users
    .create({
      name: req.body.name,
      email: req.body.email,
      password,
      tasks: [],
      comm: req.body.char[0],
      worbef: req.body.char[1],
      skills: req.body.char[2],
      knowledge: req.body.char[3]
    })
    .then(data => {
      console.log(data);
      res.json({ data, password })
    })
    .catch(err => console.log(err));
});

router.delete('/delete/:username', (req, res) => {
  Users
    .findOne({ where: { name: req.params.username } })
    .then(user => {
      if (user.tasks.length)
        return res.status(200).json({ msg: 'Can\'t delete user that have not finished his tasks' });
      user.destroy().then(() => res.status(200).send('done'))
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ msg: 'There is no such user found' })
    })
});

module.exports = router;