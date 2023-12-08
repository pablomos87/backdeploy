const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const cookieParser = require ('cookie-parser');
const adminRouter = require('./routers/adminRouter.js');
const userRouter = require('./routers/userRouter.js');
const coursesRouter = require('./routers/coursesRouter.js');
const session = require('express-session');


const app = express();
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(cors({
origin: 'http://localhost:3000',
  credentials: true,
})); 

app.use(session({
  secret: 'mi-clave',
  resave: false, 
  saveUninitialized: false, 
  cookie: { maxAge: 7 * 24 * 60 * 60 * 1000,
  sameSite: 'lax',
  secure: false,
 }
}));

app.use((req, res, next) => {
  console.log('Sesión creada:', req.session);
  next();
});

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
