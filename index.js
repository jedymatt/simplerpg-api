require('dotenv').config();

const app = require('./app');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/users', usersRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on http://localhost:${port}`));
