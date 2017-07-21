const router = require('express').Router();
const UserController = require('../controllers/UserController');
const multer  = require('multer');
const upload = multer({ dest: './public/uploads/' });

router.get('/profile', UserController.userProfileGet);

router.get('/:id/edituser', UserController.userUpdateGet);
router.post('/:id/edituser',upload.single('avatar-1'), UserController.userUpdatePost);

module.exports = router;
