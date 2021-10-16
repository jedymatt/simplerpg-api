const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  db('user')
    .limit(5)
    .then((rows) => {
      res.json(rows);
    });
});

router.get('/:id', (req, res) => {
  db('user')
    .where('id', req.params.id)
    .limit(1)
    .then((rows) => {
      res.json(rows);
    });
});

router.get('/discord/:discord_id', (req, res) => {
  db
    .select('*')
    .from('user')
    .where({ discord_id: req.params.discord_id })
    .limit(1)
    .then((rows) => {
      res.json(rows);
    });
});

router.post('/', (req, res) => {
  db
    .raw(`
      CALL proc_create_user(${req.body.discord_id});
    `)
    .then(() => {
      res.json({ message: 'success' });
    })
    .catch(() => {
      res.status(400).json({ message: 'discord_id already exists.' });
    });
});

module.exports = router;
