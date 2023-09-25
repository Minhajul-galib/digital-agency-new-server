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
        const SubscriberCollection = databseCollection.collection('Subscriber');
        const servicesReviewCollection = databseCollection.collection('servicesreview');
        const studentReviewCollection = databseCollection.collection('StudentReview');
        const CourseVideoCollection = databseCollection.collection('Course_video');
        const instructorCollection = databseCollection.collection('instructor');
        const blogCollection = databseCollection.collection('Blog');
        const studentOrderTrackCollection = databseCollection.collection('StudentOrderTrack');
        const studentsCollection = databseCollection.collection('Students');
        const studentTrackCollection = databseCollection.collection('studentClassTrack');


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

// Subscriber
        // Subscriber
        app.post('/Subscriber', async (req, res)=>{
            const Subscriber = req.body;
            const SubscriberAdd = await SubscriberCollection.insertOne(Subscriber);

            res.json(SubscriberAdd);
        });

        app.get('/Subscriber', async (req, res)=>{
            const Subscriber = SubscriberCollection.find({});

            const allSubscriber = await Subscriber.toArray();

            res.send(allSubscriber);
        });

// Services Reviews!
        // Services Reviews!
        app.get('/servicesreview', async (req, res)=>{
            const servicesreview = servicesReviewCollection.find({});

            const allservicesreview = await servicesreview.toArray();

            res.send(allservicesreview);
        });

        
// Student Reviews
        // Student Reviews
        app.get('/StudentReview', async (req, res)=>{
            const StudentReview = studentReviewCollection.find({});
            const allStudentReview = await StudentReview.toArray();

            res.send(allStudentReview);
        });


// CLASS VIDEO GET!
        // CLASS VIDEO GET!
        app.post('/CourseVideo', async (req, res)=>{
            const classVideo = req.body;
            const addClassVideo = await CourseVideoCollection.insertOne(classVideo);

            res.json(addClassVideo);
        });
        app.get('/CourseVideo', async (req, res)=>{
            const CourseVideo = CourseVideoCollection.find({});
            const allCourseVideo = await CourseVideo.toArray();

            res.send(allCourseVideo);
        });
        app.get('/CourseVideo/:id', async (req, res)=>{
            const id = req.params.id;
            const query = {_id: new objectId(id)}

            const CourseVideoID = await CourseVideoCollection.findOne(query);
            res.json(CourseVideoID);
        });

// instructor
        // instructor
        app.get('/instructor', async (req, res)=>{
            const instructor = instructorCollection.find({});
            const allInstructor = await instructor.toArray();

            res.send(allInstructor);
        })
        
// Blog
        // Blog
        app.get('/blog', async (req, res)=>{
            const blog = blogCollection.find({});
            const allBlog = await blog.toArray();

            res.send(allBlog);

        });

        
// Student Order Track course handle!
       // Student Order Track course handle!

       app.post('/studentOrderTrack', async (req, res)=>{
        const studentOrderTrack = req.body;
        const studentOrderTrackDB = await studentOrderTrackCollection.insertOne(studentOrderTrack);

        res.json(studentOrderTrackDB);
        });

        app.get('/studentOrderTrack', async (req, res)=>{
            const studentOrderTrack = studentOrderTrackCollection.find({});
            const allStudentOrderTrack = await studentOrderTrack.toArray();

            res.send(allStudentOrderTrack);
        });

        app.get('/studentOrderTrack/:id', async (req, res)=>{
            const id = req.params.id;
            const query = {_id: new objectId(id)}

            const result = await studentOrderTrackCollection.findOne(query);

            res.json(result)
        });

        app.put('/studentOrderTrack/:id', async (req, res)=>{
            const status = req.body;
            const value = status.value;
            const id = status.id;
            const filter = {_id: new objectId(id)}; 
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    paymentStatus: value
                },
            };

            const result = await studentOrderTrackCollection.updateOne(filter, updateDoc, options);

            res.json(result)
        });

        app.delete('/studentOrderTrack/:id', async (req, res)=>{
            const id = req.params.id;
            const query = {_id: new objectId(id)}

            const stuOrderTrackDelete = await studentOrderTrackCollection.deleteOne(query);
            
            res.json(stuOrderTrackDelete);
        });


// Students
        // Students
        app.get('/Students', async (req, res)=>{
            const Students = studentsCollection.find({});
            const allStudents = await Students.toArray();

            res.send(allStudents);
        });

        app.post('/Students', async (req, res)=>{
            const Students = req.body;
            const addStudents = await studentsCollection.insertOne(Students)

            res.json(addStudents);
        });

        app.put('/Students/:id', async (req, res) =>{
            const Students = req.body;
            const image = Students.stu_image;
            const id = req.params.id;
            const filter = {_id: new objectId(id)};
            const option = { upsert: true };
            const sendImage = {
                $set: {
                    stu_image: image
                }
            };
            const result = await studentsCollection.updateOne(filter, sendImage, option)

            res.json(result)
        });

// studentClassTrack
        // studentClassTrack
        app.post('/studentClassTrack', async (req, res)=>{
            const studentTrack = req.body;
            const addStudentClass = await studentTrackCollection.insertOne(studentTrack)

            res.json(addStudentClass);
        });

        app.get('/studentClassTrack', async (req, res)=>{
            const studentClassTrack = studentTrackCollection.find({});
            const classTrack = await studentClassTrack.toArray();

            res.send(classTrack)
        })
        
        app.get('/studentClassTrack/:id', async (req, res) =>{
            const id = req.params.id;
            const query = {_id: new objectId(id)}

            const result = await studentTrackCollection.findOne(query);
            res.json(result)
        })

      
        app.put('/studentClassTrack/:studentEmail', async (req, res) =>{
            const email = req.body.studentEmail;
            const courseCode = req.body.course_code;
            const course_class_no = req.body.course_class_no;
         
            const query = {
                studentEmail : email, 
                course_code: courseCode
            }
            // const resultGte = studentTrackCollection.find(query);
            // const trackCourse = await resultGte.toArray();
            const option = {upsert: true};
            const updateDoc = {
                $set: {
                    course_class_no: course_class_no
                },
            };
            const inserResult = await studentTrackCollection.updateOne(query, updateDoc, option);

            res.json(inserResult)
        })



  } finally {
    // await client.close();
  }
}

run().catch(err=>(console.log(err)))



app.listen(port,()=>{
    console.log(`Yeah it is running ${port}`);
})

