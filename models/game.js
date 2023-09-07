const mongoose = require('mongoose');
const Schema = mongoose.Schema
const reviewSchema = require('./review')
const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  developer: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
},
  reviews: [reviewSchema]
}, { timestamps: true })

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
