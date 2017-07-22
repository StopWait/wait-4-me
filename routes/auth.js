const express = require("express");
const router = express.Router();
const AuthController = require('../controllers/AuthController');

router.get("/signup", AuthController.signupGet);
router.post('/signup', AuthController.signupPost);

router.get('/login', AuthController.loginGet);
router.post('/login', AuthController.loginPost);

router.get('/logout', AuthController.logout);

router.get("/auth/facebook", AuthController.facebookGet);
router.get("/auth/facebook/callback", AuthController.facebookCallbackGet);

module.exports = router;
