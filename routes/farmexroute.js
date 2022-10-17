const express = require('express');

const farcntrlr = require('../controller/farmexcntrlr');

const router = express.Router();

router.post('/signup',farcntrlr.createUser);

router.post('/sign_in',farcntrlr.validateUser);

module.exports = router;

