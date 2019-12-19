const express = require('express');
const router = express.Router();
const Tasks = require('../models/tasks');
const States = require('../models/state');
const Users = require('../models/users');

router.get('/', (req, res) => {
  Tasks
    .findAll()
    .then(tasks => res.json(tasks))
    .catch(err => console.log(err))
});

router.get('/state', (req, res) => {
  States
    .findAll()
    .then(states => res.json(states))
    .catch(err => console.log(err))
});

router.get('/state/:task', (req, res) => {
  States
    .findAll({ where: { name: req.params.task } })
    .then(states => res.json(states))
    .catch(err => console.log(err))
});

router.post('/add', (req, res) => {
  Tasks
    .create({
      name: req.body.name,
      state: req.body.state ? req.body.state : 'Start'
    })
    .then(data => {
      States
        .create({
          name: req.body.name,
          user: 'There is no user yet',
          state: 'Start',
          users: [],
          action: 'Created',
          managed: 'Manager/Admin'
        })
        .then(state => res.json({ data, state }))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

router.post('/add-user', (req, res) => {
  Tasks
    .findOne({ where: { name: req.body.taskname } })
    .then(task => {
      Users
        .findOne({ where: { name: req.body.username } })
        .then(user => user.update({ tasks: user.tasks.indexOf(req.body.taskname) === -1 ? user.tasks.concat(req.body.taskname) : user.tasks }))
      Tasks
        .update(
          { users: task.users.indexOf(req.body.username) === -1 ? task.users.concat(req.body.username) : task.users },
          { where: { name: req.body.taskname } }
        )
        .then((data) => {
          States
            .create({
              name: req.body.taskname,
              users: task.users,
              state: task.state,
              action: `Added user ${req.body.username}`,
              managed: 'Manager/Admin'
            })
            .then(state => res.status(200).json({ data, state }))
            .catch(err => console.log(err));
        })
        .catch(err => {
          console.log(err);
          res.status(400)
        });
    })
});

router.delete('/delete-user/:username/:taskname', (req, res) => {
  Tasks
    .findOne({ where: { name: req.params.taskname } })
    .then(task => {
      Users
        .findOne({ where: { name: req.params.username } })
        .then(user => user
          .update({ tasks: user.tasks.filter(el => el !== req.params.taskname) }))
      Tasks
        .update(
          { users: task.users.filter(el => el !== req.params.username) },
          { where: { name: req.params.taskname } }
        )
        .then(() => {
          States
            .create({
              name: req.params.taskname,
              users: task.users,
              state: task.state,
              action: `Deleted user ${req.params.username}`,
              managed: 'Manager/Admin'
            })
            .then((state) => res.status(200).json({ state, msg: 'done' }))
            .catch(err => console.log(err));
        })
        .catch(err => {
          console.log(err);
          res.status(400).json({ msg: 'Wrong input' })
        });
    })
});

router.post('/state', (req, res) => {
  Tasks
    .findOne({ where: { name: req.body.taskname } })
    .then(task => {
      Tasks
        .update(
          { state: req.body.state },
          { where: { name: req.body.taskname } }
        )
        .then(() => {
          States
            .create({
              name: req.body.taskname,
              users: task.users,
              state: task.state,
              action: `Set state: ${req.body.state}`,
              managed: 'Manager/Admin'
            })
            .then(state => res.status(200).json({ state }))
            .catch(err => console.log(err));
        })
        .catch(err => {
          console.log(err);
          res.status(400)
        });
    })
})


module.exports = router;