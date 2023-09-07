const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const Game = require('../models/game');
const reviewSchema = require('../models/review');

// Create a new game (POST request)
router.post('/', gameController.createGame);


//games/:id/reviews
router.post('/reviews/:id', (req, res) => {
  // need to assign owner
  req.body.author = req.user._id

  // find the game
  Game.findById(req.params.gameId)
      // push the comment into the comments array
      // save the game
      .then(game => {
        game.reviews.push(req.body)

          return game.save()
      })
      // redirect
      .then(game => {
          res.redirect(`/games/${game._id}`)
      })
      // handle errors
      .catch(error => console.error)
    })


router.get('/new', function(req, res, next) {
  res.render('games/form', { title: 'Add a New Game' });
});

// Display game details and reviews
router.get('/:id', (req, res) => {
  // Fetch the game details
  Game.findById( req.params.id )
    .then(game => {
      console.log(game);
      res.render('games/gameDetails'), { game }
    })
    .catch (err => {
    console.error(err);
    res.render(500);
    })
    // if (!game) {
    //   res.status(404).json({ message: 'Game not found' });
    //   return;
    // }
})
router.post('/delete/:id', gameController.deleteGame);

// Games Page (GET request)
router.get('/', (req, res) => {
  Game.find({})
    .then(games => {
      res.render('games/games', { title: 'Nerd Nook Games', games });
    }) .catch (err => {
      res.render(500);
    })
  }
);

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

// Update game details (POST request)
router.post('/edit/:id', async (req, res) => {
  try {
    const gameId = req.params.id;
    const updatedData = {
      title: req.body.title,
      price: req.body.price,
      genre: req.body.genre,
      developer: req.body.developer,
      publisher: req.body.publisher,
    };

    const updatedGame = await Game.findByIdAndUpdate(gameId, updatedData, {
      new: true,
    });

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
