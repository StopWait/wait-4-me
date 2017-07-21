const router = require('express').Router();
const ReviewController = require('../controllers/ReviewController');

router.get('/:id/create', ReviewController.createReviewGet);
router.post('/:id/create', ReviewController.createReviewPost);

router.get('/:id/delete', ReviewController.reviewDelete);

router.get('/:id/update', ReviewController.reviewUpdateGet);
router.post('/:id/update', ReviewController.reviewUpdatePost);


module.exports = router;
