//////////////////////////////
//// Import Dependencies  ////
//////////////////////////////
const express = require('express')
require('dotenv').config()

const Game = require('../models/game')

const router = express.Router()

//////////////////////////////
//// Routes + Controllers ////
//////////////////////////////

// Create
router.post('/reviews', (req, res) => {
    // need to assign owner
    req.body.author = req.user._id

    // find the game
    Game.findById(req.params.gameId)
        // push the review into the reviews array
        // save the game
        .then(game => {
            game.reviews.push(req.body)
            console.log('review added')
            return game.save()
        })
        // redirect
        .then(game => {
            res.redirect(`/games/${game._id}`)
        })
        // handle errors
        .catch(error => console.error)
})

// edit
// hint for subdoc update -> render a form similar to how we updated the game
router.get('/edit/:id', (req, res) => {
    res.send('commend edit form')
})

// Update
// update route should follow the same steps as delete, but with update instead of delete
// look up update methods in the mongoose docs
router.patch('/:id', (req, res) => {
    res.send('edit review route')
})

// Delete
router.delete('/:gameId/:reviewId', (req, res) => {
    const fId = req.params.gameId
    const cId = req.params.reviewId
    // find the game
    Game.findById(fId)
        .then(game => {
            // isolate the review
            const theReview = game.reviews.id(cId)
            // check for ownership
            if (req.user && theReview.author == req.user.id) {
                // run a document method to remove the review(could also use .remove())
                theReview.deleteOne()
                // save the parent model
                return game.save()
            } else {
                res.send('something went wrong')
            }
        })
        .then(game => {
            // redirect to the show page
            res.redirect(`/games/${game._id}`)
        })
        .catch(error => console.error)
})


////////////////////////////
//// Export the Router  ////
////////////////////////////
module.exports = router