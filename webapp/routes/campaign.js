const router = require('express').Router();
const CampaignController = require('../controllers/CampaignController');

router.get('/', CampaignController.index);
router.get('/create', CampaignController.createGet);
router.post('/create', CampaignController.createPost);

module.exports = router;
