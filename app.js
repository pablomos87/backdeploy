const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const adminRouter = require('./routers/adminRouter.js');
const userRouter = require('./routers/userRouter.js');
const coursesRouter = require('./routers/coursesRouter.js');

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(cors({
origin: 'http://localhost:3000',
  credentials: true,
})); 


app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.json('Este es el backend');
});

app.use('/users', userRouter);
app.use('/courses',  coursesRouter);
app.use('/admin', adminRouter);

let visitCount = 0;

app.get('/counter', (req, res) => {
  res.json({ count: visitCount });
});

module.exports = app;
