const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Users = require('../models/users');

const generateToken = (login) =>
  jwt.sign({ login }, 'jwtSecret', {
    expiresIn: 60 * 60 * 72
  });

router.post('/login', (req, res) => {
  Users.findOne({ where: { email: req.body.login } })
    .then(item => {
      return item && item.password === req.body.pwd ?
        res.json({ token: generateToken(req.body.login), success: true }) :
        res.json({ success: false })
    })
    .catch(err => res.json({ success: false }));
});

router.post('/auth-check', (req, res) => {
  jwt.verify(req.body.token, 'jwtSecret', err => {
    return err ?
      res.json({ success: false }) :
      res.json({ success: true });
  })
});

router.post('/register', (req, res) => {
  console.log(req.body);
  Users.findOne({ where: { email: req.body.email } })
    .then(item => {
      return item ?
        res.json({ success: false }) :
        Users
          .create({ name: req.body.name, password: req.body.pwd, email: req.body.email })
          .then(() => res.json({ token: generateToken(req.body.name), success: true }));
    })
    .catch(err =>
      res.json({ success: false })
    )
});


module.exports = router;