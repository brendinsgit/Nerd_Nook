// controllers/gameController.js
const Game = require('../models/game');

module.exports = {
  createGame,
  deleteGame
};

async function createGame(req, res) {
  try {
    const {
      title,
      price,
      review,
      description,
      genre,
      developer,
      publisher,
      releaseDate,
    } = req.body;

    
    const newGame = new Game({
      title,
      price,
      review,
      description,
      genre,
      developer,
      publisher,
      releaseDate,
    });

    
    await newGame.save();

   
    res.status(201).json({ message: 'Game created successfully', game: newGame });
  } catch (error) {
    console.error('Error creating game:', error);
    res.status(500).json({ message: 'Error creating game' });
  }
};


async function deleteGame(req, res) {
  try {
    const gameId = req.params.id;

   
    const result = await Game.deleteOne({ _id: gameId });

    if (result.deletedCount === 0) {
      // If the game doesn't exist, return a 404 status
      res.status(404).json({ message: 'Game not found' });
    } else {
      // Redirect to the games list page 
      res.redirect('/games');
    }
  } catch (error) {
    console.error('Error deleting game:', error);
    res.status(500).json({ message: 'Error deleting game' });
  }
}