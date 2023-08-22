import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from 'pusher';
import cors from 'cors';

//app config
const app=express()
const port=process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1654901",
    key: "720d8d06d43bf6d86018",
    secret: "a07189b8ee9f279d42c0",
    cluster: "ap2",
    useTLS: true
  });
//middleware
app.use(express.json());
app.use(cors());

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader("Access-Control-Allow-Headers","*");
    next();
})

mongoose.connect("mongodb+srv://naman:130N8effyc@cluster0.6qyj4nc.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

const db=mongoose.connection

db.once('open',()=>{
    console.log('DB connected');

    const msgCollection=db.collection('messagecontents');
    const changeStream=msgCollection.watch();

    changeStream.on('change',(change)=>{
        console.log(change);

        if(change.operationType === 'insert'){
            const messageDetails = change.fullDocument;
            pusher.trigger('messages','inserted',
            {
                name:messageDetails.user,
                message:messageDetails.message,
                timestamp:messageDetails.timestamp,
                recieved:messageDetails.recieved,
            }
        );

        }else{
            console.log('error triggering pusher')
        }
    });
}); 

app.get('/',(req,res)=>res.status(200).send("hello world"));

app.get('/message/sync', async (req, res) => {
    try {
        const data = await Messages.find();
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/message/new', (req, res) => {
    const dbMessage = req.body;

    Messages.create(dbMessage)
        .then(data => {
            res.status(201).send(`New message created:\n ${data}`);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

app.listen(port,()=>console.log(`listening to localhost ${port}`)); 