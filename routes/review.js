const router = require('express').Router();
const ReviewController = require('../controllers/ReviewController');
const middle = require('../config/middlewares');

router.get('/:id/create', middle.EnsureLoggedIn, ReviewController.createGet);
router.post('/:id/create', middle.EnsureLoggedIn, ReviewController.createPost);

router.get('/:id/delete', middle.EnsureLoggedIn, ReviewController.delete);

router.get('/:id/update', middle.EnsureLoggedIn, ReviewController.editGet);
router.post('/:id/update', middle.EnsureLoggedIn, ReviewController.editPost);


module.exports = router;
