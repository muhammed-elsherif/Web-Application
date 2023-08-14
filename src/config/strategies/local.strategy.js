import passport from 'passport';
import { Strategy } from 'passport-local';
import { MongoClient } from 'mongodb';
// import debug from "debug";

// debug = ('app:localStrategy');

export default function localStrategy() {
  passport.use(
    new Strategy(
      {
        usernameField: 'username',
        passwordField: 'password',
      },
      (username, password, done) => {
        const url = 
          'mongodb+srv://mody10726:YKXM6PccVwi3nmrs@cluster0.whpfe2q.mongodb.net?retryWrites=true&w=majority';
        const dbName = 'globo';
        (async function validateUser() {
          let client =  new MongoClient(url);
          try {
            client = await MongoClient.connect(url);
            const db = client.db(dbName);
            const user = await db.collection('users').findOne({ username });

            if (user && user.password === password) {
              done(null, user);
            } else {
              done(null, false);
            }
          } catch (error) {
            done(error, false);
          }

          if (client !== null) {
            await client.close();
          }
        })();
      }
    )
  );
};
