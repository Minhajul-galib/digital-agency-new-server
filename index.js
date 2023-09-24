const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = `mongodb+srv://newDagencyBD:VzOvoxzGu7LZkbiv@cluster0.cs9gj.mongodb.net/?retryWrites=true&w=majority`;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cs9gj.mongodb.net/?retryWrites=true&w=majority`;
console.log(process.env.DB_USER);
console.log(process.env.DB_PASS);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
app.get('/', async (req, res)=>{
    res.send('Show My code it is running')
})
async function run() {
  try {
    
        const databseCollection = client.db('Digital_Agency_BD');
        const userCollection = databseCollection.collection('user');


// USER!
        // USER!
        app.post('/users', async (req, res)=>{
            const user = req.body;
            const userAdd = await userCollection.insertOne(user);

            res.json(userAdd);
        });

        app.get('/users', async (req, res)=>{
            const user = userCollection.find({});

            const allUser = await user.toArray();

            res.send(allUser);
        });



  } finally {
    // await client.close();
  }
}

run().catch(err=>(console.log(err)))



app.listen(port,()=>{
    console.log(`Yeah it is running ${port}`);
})

