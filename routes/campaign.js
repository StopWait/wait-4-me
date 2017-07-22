const router = require('express').Router();
const CampaignController = require('../controllers/CampaignController');
const middle = require('../config/middlewares');

router.get('/', CampaignController.index);

router.get('/create', middle.EnsureLoggedIn, CampaignController.createGet);
router.post('/create', middle.EnsureLoggedIn, CampaignController.createPost);

router.get('/:id/detail', middle.EnsureLoggedIn, CampaignController.detail);

router.get('/:id/delete', middle.EnsureLoggedIn, CampaignController.delete);

router.get('/:id/update', middle.EnsureLoggedIn, CampaignController.editGet);
router.post('/:id/update', middle.EnsureLoggedIn, CampaignController.editPost);

router.post('/:id/request', middle.EnsureLoggedIn, CampaignController.requestPost);
router.post('/:id/complete', middle.EnsureLoggedIn, CampaignController.markAsCompletePost);

module.exports = router;
