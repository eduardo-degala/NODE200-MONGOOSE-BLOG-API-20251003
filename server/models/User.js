//USER.JS (mongoose model definition file, defines structure/schema)

//IMPORTS mongoose & EXTRACTS schema
const mongoose = require('mongoose');               //imports mongoose library, used f/MongoDB in Node.js
const Schema = mongoose.Schema;                     //extracts schema class f/mongoose, blueprint of structure
 
//CREATES new mongoose schema - USER
const UserSchema = new Schema({                     //creates new schema obj, defines user fields
    firstName: { type: String, required: true},     //field, firstName property is a string and required
    lastName: { type: String, required: true},      //tbd, is "string" to be capitalized, "String" per JS rqmnts
    email: { type: String, required: true},
    social: {
        facebook: { type: String, required: false },
        twitter: { type: String, required: false },
        linkedIn: { type: String, required: false }
    },
    blogs: [{ type: Schema.Types.ObjectId, ref: 'Blog' }] //Blog written by User w/many Blogs, one-to-many
    //propertyName: { type: String, required: false } //placeholder template, if adding more properties
}); 

//EXPORTS userschema mongoose model
module.exports = mongoose.model('User', UserSchema); 
                                                    //exports mongoose model based on userSchema, export accessible f/files in project
                                                    //mongoose.model() creates a model called "User" tied to userSchema
                                                    