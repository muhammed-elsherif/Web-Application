import  express from "express";
import { MongoClient } from 'mongodb';
import debug from "debug";
import sessions from '../data/sessions.json' assert {type: 'json'};

const adminRouter = express.Router();

adminRouter.route('/').get((req,res)=>{
    const url = 'mongodb+srv://mody10726:YKXM6PccVwi3nmrs@cluster0.whpfe2q.mongodb.net?retryWrites=true&w=majority';
    const dbName = 'globo';

    (async function mongo(){
        let client = new MongoClient(url);
        try {
            client = await MongoClient.connect(url);
            debug('Connected to the mongo DB');
            const db = client.db(dbName);
            const response = await db.collection('sessions').insertMany(sessions);
            console.log(response);
            res.json(response);

            // const cursor = ratings.find();
            // await cursor.forEach(doc => console.dir(doc));
        } catch (error) {
            console.log(error);
        }
        // finally {
            // await 
            client.close();
        // }
    })()   
})

export default adminRouter;