const router = require('express').Router();
const CampaignController = require('../controllers/CampaignController');

router.get('/', CampaignController.index);

router.get('/create', CampaignController.createGet);
router.post('/create', CampaignController.createPost);

router.get('/:id/detail', CampaignController.detail);

router.get('/:id/delete', CampaignController.delete);

router.get('/:id/update', CampaignController.editGet);
router.post('/:id/update', CampaignController.editPost);

router.post('/:id/request', CampaignController.requestPost);

router.post('/:id/complete', CampaignController.markAsCompletePost);

module.exports = router;
