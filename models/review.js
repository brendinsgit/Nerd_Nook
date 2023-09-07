////////////////////////////////////////////////////
//// Our schema and model for the user resource ////
////////////////////////////////////////////////////
// we want our mongoose object to relate to our db
// we're going to bring in the mongoose connection from our utils
const mongoose = require('mongoose');

// we'll destructure the Schema and model functions from mongoose
const Schema = mongoose.Schema;

// review schema
const reviewSchema = new Schema({
    note: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

// this is a subdoc, so we'll just export the schema
// we wont make this a model

module.exports = reviewSchema;