const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const adminRouter = require('./routers/adminRouter.js');
const userRouter = require('./routers/userRouter.js');
const coursesRouter = require('./routers/coursesRouter.js');
const visitsRouter = require('./routers/visitsRouter.js');

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(cors({
origin: ['https://frontdeploy-pablomos87.vercel.app', 'https://frontdeploy-gold.vercel.app', 'https://frontdeploy-git-master-pablomos87.vercel.app', 'https://proyectofinal-utn.netlify.app'],
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
app.use('/visits', visitsRouter);

module.exports = app;
