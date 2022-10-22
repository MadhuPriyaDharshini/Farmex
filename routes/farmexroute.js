const express = require('express');

const farcntrlr = require('../controller/farmexcntrlr');

const router = express.Router();

router.post('/signup',farcntrlr.createUser);

router.post('/sign_in',farcntrlr.validateUser);

router.post('/userinfo',farcntrlr.userInfo);

module.exports = router;


