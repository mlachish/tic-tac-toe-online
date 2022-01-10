const router = require('express').Router()
const { createPlayer } = require('./players')

const noop = (req, res) => {
    res.status(200).end()
}

router
    .post('api/enter', noop)

module.exports = router