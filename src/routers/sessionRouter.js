import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import debug from "debug";
import sessions from '../data/sessions.json' assert {type: 'json'};
import speakerService from "../services/speakerServices.js";

const sessionsRouter = express.Router();

sessionsRouter.use((req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect('/auth/signIn');
    }
});

sessionsRouter.route('/:id')
.get((req,res)=>{
    const url = 'mongodb+srv://mody10726:YKXM6PccVwi3nmrs@cluster0.whpfe2q.mongodb.net?retryWrites=true&w=majority';
    const dbName = 'globo';

    (async function mongo(){
        let client = new MongoClient(url);
        try {
            client = await MongoClient.connect(url);
            const db = client.db(dbName);
            const session = await db.collection('sessions').findOne({_id: new ObjectId(id)});
            const speaker = await speakerService.getSpeakerById(
                session.speakers[0].id
              );
              session.speaker = speaker.data;
            res.render('session', {session});
            // await cursor.forEach(doc => console.dir(doc));
        } catch (error) {
            console.log(error);
        }
        finally {
            await client.close();
        }
    })();
    ///////////////////////////////////////
    // res.send("Hello Single Session");
    const id = req.params.id;
    // res.render('session', {
    //     session: sessions[id],
    // })
})

sessionsRouter.route('/')
.get((req,res)=>{
    const url = 'mongodb+srv://mody10726:YKXM6PccVwi3nmrs@cluster0.whpfe2q.mongodb.net?retryWrites=true&w=majority';
    const dbName = 'globo';

    (async function mongo(){
        let client = new MongoClient(url);
        try {
            client = await MongoClient.connect(url);
            const db = client.db(dbName);
            const sessions = await db.collection('sessions').find().toArray();
            res.render('sessions', {sessions, title: 'Sessions'});
            // await cursor.forEach(doc => console.dir(doc));
        } catch (error) {
            console.log(error);
        }
        finally {
            await client.close();
        }
    })();
    ///////////////////////////////////////
    // res.send("Hello Sessions");
    // res.render('sessions', {sessions, title: 'Sessions'})
})

export default sessionsRouter;