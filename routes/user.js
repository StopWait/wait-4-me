const router = require('express').Router();
const UserController = require('../controllers/UserController');
const multer  = require('multer');
const upload = multer({ dest: './public/uploads/' });

router.get('/profile', UserController.profileGet);

router.get('/:id/edituser', UserController.editGet);
router.post('/:id/edituser', upload.single('avatar-1'), UserController.editPost);

module.exports = router;
