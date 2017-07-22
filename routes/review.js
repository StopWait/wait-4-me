const router = require('express').Router();
const ReviewController = require('../controllers/ReviewController');

router.get('/:id/create', ReviewController.createGet);
router.post('/:id/create', ReviewController.createPost);

router.get('/:id/delete', ReviewController.delete);

router.get('/:id/update', ReviewController.editGet);
router.post('/:id/update', ReviewController.editPost);


module.exports = router;
