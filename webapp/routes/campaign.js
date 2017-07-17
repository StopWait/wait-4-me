const router = require('express').Router();
const CampaignController = require('../controllers/CampaignController');

router.get('/', CampaignController.index);

router.get('/create', CampaignController.createCampaignGet);
router.post('/create', CampaignController.createCampaignPost);

router.get('/:id/detail', CampaignController.campaignDetail);

router.get('/:id/delete', CampaignController.campaignDelete);

router.get('/:id/update', CampaignController.campaignUpdateGet);
router.post('/:id/update', CampaignController.campaignUpdatePost);


module.exports = router;
