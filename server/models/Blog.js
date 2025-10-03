//BLOG.JS

//IMPORTS mongoose & EXTRACTS schema
const mongoose = require('mongoose');               //imports mongoose library, used f/MongoDB in Node.js
const Schema = mongoose.Schema;                     //extracts schema class f/mongoose, blueprint of structure

//CREATES new mongoose schema - BLOG
const BlogSchema = new Schema ({
    title:      {type: String, required: true},
    article:    {type: String, required: true},
    published:  {type: Date, required: true},
    featured:    {type: Boolean, required: true},
    //author:     {type: ObjectId, required: true}, //cannot have duplicate keys, combined w/other
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true } //stores ref to another MongDB document
});

//EXPORTS blogschema mongoose model
module.exports = mongoose.model('Blog', BlogSchema); 