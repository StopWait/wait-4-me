const router = require('express').Router();
const UserController = require('../controllers/UserController');
const multer  = require('multer');
const upload = multer({ dest: './public/uploads/' });

router.get('/:id/editUser', UserController.userUpdateGet);
router.post('/:id/editUser',upload.single('avatar-1'), UserController.userUpdatePost);

module.exports = router;
