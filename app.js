import express from 'express';
import chalk from 'chalk';
import morgan from 'morgan';
import debug from 'debug';
import path from 'path';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import sessionsRouter from './src/routers/sessionRouter.js';
import adminRouter from './src/routers/adminRouter.js';
import authRouter from './src/routers/authRouter.js';

const PORT = process.env.PORT || 3000;
const app = express();
const __dirname = path.dirname(new URL(import.meta.url).pathname.slice(1));

// console.log(__dirname);

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'mysecret',
    resave: true,
    saveUninitialized: false
  }));

import passportConfig from './src/config/passport.js';

passportConfig(app);

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/sessions', sessionsRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
    // res.send('Hello My Node Application');
    res.render('index', {title: 'Globomantics', data: ['a', 'b', 'c']});
})

app.listen(PORT, ()=>{
    console.log('listening to port ' + chalk.green(PORT));
    // debug(`listening on port ${chalk.green(PORT)}`);
})