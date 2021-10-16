const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// eslint-disable-next-line consistent-return
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: 'There is an error in our side.' });
});

module.exports = app;
