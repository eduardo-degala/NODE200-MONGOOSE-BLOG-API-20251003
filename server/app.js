//APP.JS (main entry point/application setup)

const express = require('express');         //express@4.21.2
const mongoose = require('mongoose');       //connecting MongoDB w/Mongoose
//const bodyParser = require('body-parser');  //not reqd f/express 4.16+
const morgan = require('morgan');           //logging middleware

const app = express();

//MIDDLEWARE
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('dotenv').config();                 //npm install dotenv

//CONNECT to MongoDB w/MONGOOSE
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost/my-blog';

//mongoose.connect('mongodb://localhost/my-blog', {     //version f/Mongoose v8+ (minus true) //REPLACEMENT URL LINE
mongoose.connect(mongoURI, {
  serverSelectionTimeoutMS: 5000                        //5 seconds timeout, npm start problem
})
  .then(() => console.log(`✅ MongoDB connected at: ${mongoURI.slice(0, 14)}`))  //added connected msg handling, URI sliced to truncate CUI
  .catch(err => {
    if (err.name === 'MongoServerSelectionError') {
      console.error('⏱️ Timeout: Could not connect to MongoDB. Is it running?');
    } else {
      console.error('❌ MongoDB connection error:', err);   //added connection error handling
    }
  });
    //mongoose.connect('mongodb://localhost/my-blog', { useMongoClient: true }); //v4/v5 but on Mongoose v8+ outdated/invalid
    //mongoose.Promise = Promise; //unnessary f/modern Mongoose, removed

    //app.use(bodyParser.json());                   //tbd if reqd f/express 4.16+ (express@4.21.2)

//STATUS
app.get('/', (req, res) => {
    res.status(200).send('🚀 API is running');      //added 200 msg
});

//ROUTER f/users.js                                 //fysa, any request starting with /api/users, use routes defined in users.js router
app.use('/api/users', require('./routes/users'));   //app.use() mounts middleware/routers on specific path f/Express app
                                                    //api/users apply middleware, routes/users imports router obj, user.js

//ROUTER f/blogs.js
app.use('/api/blogs', require('./routes/blogs'));   //models/Blog.js to routes/blogs.js

//CATCH-ALL (404)
app.use((req, res) => {                             //added fallback 404 route handler
  res.status(404).json({ error: 'Route not found' });
});

module.exports = app;


/*
npm ls
├── body-parser@1.20.3
├── chai-http@3.0.0
├── chai@4.1.2
├── express@4.21.2
├── mocha@3.5.0
├── mongoose@8.19.0
└── morgan@1.10.1
*/