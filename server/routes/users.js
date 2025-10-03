//USERS.JS (ROUTES, define all routes related to users/Express Router (handles GET POST PUT DELETE f/users)

const express = require('express');         //imports Express library
const router = express.Router();            //creates NEW router object (router=mini express app)
const User = require('../models/User');     //imports User.js (mongoose model definition file, defines structure/schema)

//GET /api/users/ - get all users           //_GET /api/users/ Get all Users .find()
router.get('/', (req, res) => {             //GET route handler for path '/' f/users f/request obj & response obj
    User.find()                             //find() returns promise (obj representing future result)
        .then(users => {                    //then() runs when find operation completes successfully
            res.status(200).json(users);    //200="OK"
        })
        .catch(err => {                     //added 500 error
            res.status(500).json({error: 'Failed to fetch users'});
        });                                 //500=internal server error
});

//GET /api/users/:id - get a single user by ID
router.get('/:id', (req, res) => {          //_GET /api/users/:id Get single User .findById()
    const { id } = req.params;
    User.findById(id)
        .then(user => {                     //404=not found
            if (!user) return res.status(404).json({ error: 'User not found' });
            res.status(200).json(user);     //200=okay
        })
        .catch(err => res.status(500).json({ error: 'Failed to fetch user' }));
});

//POST /api/users/ - create a new user
router.post('/', (req, res) => {            //_POST /api/users/ Create a User .save()
    const newUser = new User(req.body);
    newUser.save()
        .then(user => res.status(201).json(user)) //201=created (successful resource creation!)
        .catch(err => res.status(400).json({ error: 'Failed to create user', details: err.message }));
});                                         //400=bad request

//PUT /api/users/:id - update an existing user by ID
router.put('/:id', (req, res) => {          //_PUT /api/users/:id Update a User .findByIdAndUpdate()
    const { id } = req.params;
    User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
        .then(user => {
            if (!user) return res.status(404).json({ error: 'User not found' });
            res.status(204).json(user);     //200 changed to 204 per test spec
        })
        .catch(err => res.status(400).json({ error: 'Failed to update user', details: err.message }));
});

//DELETE /api/users/:id - delete a user by ID
router.delete('/:id', (req, res) => {       //_DELETE /api/users/:id Delete a User .findByIdAndRemove()
    const { id } = req.params;
    //User.findByIdAndRemove(id)            //depracted Mongoose v8+
    User.findByIdAndDelete(id)
        .then(user => {
            if (!user) return res.status(404).json({ error: 'User not found' });
            res.status(200).json({ message: 'User deleted successfully' });
         })
        .catch(err => res.status(500).json({ error: 'Failed to delete user' }));
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
*/