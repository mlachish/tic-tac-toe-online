const express = require('express')
const router = express.Router()
const { createPlayer } = require('./players')

const enterGame = (req, res) => {
    const player = createPlayer(req.body)
    res.status(200)
        .json(player)
        .end()
}

router
    .post('api/enter', express.json(), enterGame)

module.exports = router