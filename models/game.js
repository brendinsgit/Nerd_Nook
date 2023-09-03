// models/game.js
const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  reviews: {
    type: Number,
    default: 0,
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
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;