//BLOGS.JS (ROUTES, define all routes related to blogs/Express Router (handles GET POST PUT DELETE f/users)

const express = require('express');         //imports Express library
const router = express.Router();            //creates NEW router object (router=mini express app)
const Blog = require('../models/Blog')      //imports Blog.js

//GET /api/blogs/ - get all blogs           //GET /api/blogs/ Get all Blogs .find()
router.get('/', (req, res) => {             //GET route handler for path '/' f/blogs
    Blog.find()                             //find() returns promise (obj representing future result)
        .then(blogs => {                    //then() runs when find operation completes successfully
            res.status(200).json(blogs);    //200="OK"
        })
        .catch(err => {                     //added 500 error
            res.status(500).json({error: 'Failed to fetch blogs'});
        });                                 //500=internal server error
});

//GET /api/blogs/featured - get all featured blogs //GET /api/blogs/featured Get all featured blogs .where(), replace w/find
router.get('/featured', (req, res) => {     //GET route handler for path '/featured'
    Blog.find({featured:true})               //where()/find() w/feature true, for featured blogs
        .then(blogs => {                    //then() runs when find operation completes successfully
            res.status(200).json(blogs);    //200="OK"
        })
        .catch(err => {                     //added 500 error
            res.status(500).json({error: 'Failed to fetch blogs'});
        });                                 //500=internal server error
});

//GET /api/blogs/:id - get a single blog
router.get('/:id', (req, res) => {          //GET /api/blogs/:id Get a single blog .findById()
    const { id } = req.params;
    Blog.findById(id)
        .then(blog => {                     //404=not found
            if (!blog) return res.status(404).json({ error: 'Blog not found' });
            res.status(200).json(blog);     //200=okay
        })
        .catch(err => res.status(500).json({ error: 'Failed to fetch blog' }));
});

//POST /api/blogs/ - create a blog + associate to user ID
router.post('/', (req, res) => {            //POST /api/blogs/ Create a Blog + associate to userID .save()
    const newBlog = new Blog(req.body);
    newBlog.save()
        .then(blog => res.status(201).json(blog)) //201=created (successful resource creation!)
        .catch(err => res.status(400).json({ error: 'Failed to create blog', details: err.message }));
});                                         //400=bad request

//PUT /api/blogs/:id - update an existing user by ID
router.put('/:id', (req, res) => {          //PUT /api/blogs/:id Update a User .findByIdAndUpdate()
    const { id } = req.params;
    Blog.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
        .then(blog => {
            if (!blog) return res.status(404).json({ error: 'Blog not found' });
            res.status(204).json(blog);     //200 changed to 204 per test spec
        })
        .catch(err => res.status(400).json({ error: 'Failed to update blog', details: err.message }));
});

//DELETE /api/blogs/:id - delete a user
router.delete('/:id', (req, res) => {       //DELETE /api/blogs/:id Delete a User .findByIdAndRemove()
    const { id } = req.params;
    //Blog.findByIdAndRemove(id)              //depracated in Mongoose v8+
    Blog.findByIdAndDelete(id)
        .then(blog => {
            if (!blog) return res.status(404).json({ error: 'Blog not found' });
            res.status(200).json({ message: 'Blog deleted successfully' });
         })
        .catch(err => res.status(500).json({ error: 'Failed to delete blog' }));
});

module.exports = router;                    //exports ROUTER to be imported/used f/other files

/*
Status	                    Meaning	                                    When to Use
200 OK	                    Success, response contains data	            For most GET, PUT, DELETE requests
201 Created	                Success, and a new resource was created	    Specifically for successful POST that creates a new record
204 No Content
400 Bad Request	            Client sent invalid data	                Often used when validation fails or request is malformed
404 Not Found	            Requested resource doesn't exist	        For invalid IDs or missing resources
500 Internal Server Error	Something failed on the server	            Generic catch-all for unexpected errors

GET /api/blogs/ Get all Blogs .find()
GET /api/blogs/featured Get all featured blogs .where()
GET /api/blogs/:id Get a single blog .findById()
POST /api/blogs/ Create a Blog + associate to userID .save()
PUT /api/blogs/:id Update a User .findByIdAndUpdate()
DELETE /api/blogs/:id Delete a User .findByIdAndRemove()
*/