const express = require('express');
const router = express.Router();

// functions
const pcfl = require('./service/pcfl');
// 등록
router.post('/pcfl', pcfl);

module.exports = router;