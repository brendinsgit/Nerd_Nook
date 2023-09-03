// routes/games.js
const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const Game = require('../models/game'); 

// Create a new game (POST request)
router.post('/', gameController.createGame);

router.get('/new', function(req, res, next) {
  res.render('games/form', { title: 'Add a New Game' });
});


router.get('/:title', async (req, res, next) => {
  try {
    const gameTitle = req.params.title;
    const game = await Game.findOne({ title: gameTitle });

    if (!game) {
      res.status(404).json({ message: 'Game not found' });
      return;
    }

    res.render('games/gameDetails', { title: game.title, game });
  } catch (err) {
    next(err);
  }
});



router.post('/delete/:id', gameController.deleteGame);

// Games Page (GET request)
router.get('/', async function(req, res, next) {
  try {
    
    const games = await Game.find();

   
    res.render('games/games', { title: 'Nerd Nook Games', games });
  } catch (err) {
    
    next(err);
  }
});

router.get('/edit/:id', async (req, res, next) => {
  try {
      const gameId = req.params.id;
      const game = await Game.findById(gameId);

      if (!game) {
          res.status(404).json({ message: 'Game not found' });
          return;
      }

      res.render('games/editGame', { title: 'Edit Game', game });
  } catch (err) {
      next(err);
  }
});

// routes/games.js
router.post('/edit/:id', async (req, res) => {
  try {
      const gameId = req.params.id;
      const updatedData = {
          title: req.body.title,
          price: req.body.price,
          genre: req.body.genre,
          developer: req.body.developer,
          publisher: req.body.publisher
      };

      const updatedGame = await Game.findByIdAndUpdate(gameId, updatedData, { new: true });

      if (!updatedGame) {
          res.status(404).json({ message: 'Game not found' });
          return;
      }

      res.redirect('/games');
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error updating game' });
  }
});




module.exports = router;
