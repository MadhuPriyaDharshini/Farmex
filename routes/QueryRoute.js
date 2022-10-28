const express = require('express');

const querycntrlr = require('../controller/questioncntrlr');

const router = express.Router();

router.post('/postquery',querycntrlr.PostQueries);

router.get('/viewquery',querycntrlr.ViweQueries);

module.exports = router;

