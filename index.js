const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require('mongodb');
const objectId = require('mongodb').ObjectId;


// const uri = `mongodb+srv://newDagencyBD:VzOvoxzGu7LZkbiv@cluster0.cs9gj.mongodb.net/?retryWrites=true&w=majority`;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cs9gj.mongodb.net/?retryWrites=true&w=majority`;

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
        const coursesCollection = databseCollection.collection('Courses');
        const servicesCollection = databseCollection.collection('Services');  
        const coursesTemplateCollection = databseCollection.collection('CoursesTemplate');


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


// COURSES!
       // COURSES!
       app.get('/courses', async (req, res)=>{
        const courses = coursesCollection.find({});

        const allCourses = await courses.toArray();
        // console.log(objectId);

            res.send(allCourses);
        });

        app.get('/courses/:id', async (req, res)=>{
            const id = req.params.id;
            const query = {_id: new objectId(id)};
            const course = await coursesCollection.findOne(query);

            res.json(course)
        });


// Services
        // Services
        app.get('/services', async (req, res)=>{
            const services = servicesCollection.find({});

            const allServices = await services.toArray();

            res.send(allServices);
        });

        app.get('/services/:id', async (req, res)=>{
            const id = req.params.id;
            const query = {_id: new objectId(id)};
            const service = await servicesCollection.findOne(query);
            
            res.json(service)
        });


// CoursesTemplate
        // CoursesTemplate
        app.get('/CoursesTemplate', async (req, res)=>{
            const CoursesTemplate = coursesTemplateCollection.find({});
            const allCoursesTemplate = await CoursesTemplate.toArray();

            res.send(allCoursesTemplate);
        });

        app.get('/CoursesTemplate/:id', async (req, res)=>{
            const id = req.params.id;
            const query = {_id: new objectId(id)};

            const CoursesTem = await coursesTemplateCollection.findOne(query);
            res.json(CoursesTem)
        });


        
  } finally {
    // await client.close();
  }
}

run().catch(err=>(console.log(err)))



app.listen(port,()=>{
    console.log(`Yeah it is running ${port}`);
})

