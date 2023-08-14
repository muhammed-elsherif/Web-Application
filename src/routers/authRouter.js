import express from 'express';
// const debug = require('debug')('app:authRouter');
import { MongoClient, ObjectId } from 'mongodb';
import passport from 'passport';

const authRouter = express.Router();

authRouter.route('/signUp').post((req, res) => {
  res.json(req.body);
  const { username, password } = req.body;
  const url = 'mongodb+srv://mody10726:YKXM6PccVwi3nmrs@cluster0.whpfe2q.mongodb.net?retryWrites=true&w=majority';
  const dbName = 'globo';

  (async function addUser() {
    let client = new MongoClient(url);
    try {
      client = await MongoClient.connect(url);
      const db = client.db(dbName);
      const user = { username, password };
      const results = await db.collection('users').insertOne(user);

      // debug(results);
      req.login(results.ops[0], () => {
        res.redirect('/auth/profile');
      });
    } catch (error) {
      console.log(error);
    }
    client.close();
  })();
});

authRouter.route('/signIn').get((req, res) => {
    res.render('signin');
  })
  .post(
    passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/',
    })
  );

authRouter.route('/profile').get((req, res) => {
  res.json(req.user);
});

export default authRouter;