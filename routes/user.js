const router = require('express').Router();
const UserController = require('../controllers/UserController');
const middle = require('../config/middlewares');

router.get('/profile', middle.EnsureLoggedIn, UserController.profileGet);

router.get('/:id/edituser', middle.EnsureLoggedIn, UserController.editGet);
router.post('/:id/edituser', [middle.EnsureLoggedIn, middle.UploadFile], UserController.editPost);

module.exports = router;
