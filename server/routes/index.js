const router = require('express').Router()
const IndexController = require('../controllers/IndexController')

router.get('/', IndexController.index)

module.exports = router
