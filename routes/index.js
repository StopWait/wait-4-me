const router = require('express').Router();
const IndexController = require('../controllers/IndexController');
const auth = require('./auth');
const user = require('./user');
const campaign = require('./campaign');
const review = require('./review');

router.get('/', IndexController.index);

router.use('/auth', auth);
router.use('/user', user);
router.use('/campaign', campaign);
router.use('/review', review);

module.exports = router;
