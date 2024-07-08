const express = require('express');
const { createOrganisation } = require('../controllers/orgController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createOrganisation);

module.exports = router;
