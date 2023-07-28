import { MongoClient } from "mongodb";

async function handler (req, res) {
    if(req.method === 'POST'){
        const data = req.body;
    
        const client = await MongoClient.connect('mongodb+srv://Swapnali:Swapnalimongodb43@cluster0.lojthpf.mongodb.net/meetups?retryWrites=true&w=majority')
        const db = client.db();
        const meetupCollection = db.collection('meetups');
        const result = await meetupCollection.insertOne({data})
        console.log("result : ", result)   

        res.status(201).json({message: 'meetup inserted!'})
    }
}

export default handler;