const express = require('express');

const querycntrlr = require('../controller/questioncntrlr');

const router = express.Router();

router.post('/postquery',querycntrlr.PostQueries);

module.exports = router;

